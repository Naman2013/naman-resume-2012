import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import { ColumnTabs } from 'app/components/common/Tabs';
import VideoImageLoader from 'app/components/common/telescope-image-loader/video-image-loader';
import InstrumentNavigation from 'app/components/telescope-details/InstrumentNavigation';
import LiveFeed from 'app/components/telescope-details/live-feed-v3';
import TelescopeImageViewerController from 'app/components/telescope-details/TelescopeImageViewerController';
import {
  TabConditions,
  TabLive,
  TabQueue,
  TabTelescope,
} from 'app/modules/telescope/components/old';
import { DeviceContext } from 'app/providers/DeviceProvider';
import React, { Component } from 'react';
import style from '../telescope-details/v4-telescope-details.style';

export class TelescopeOnline extends Component {
  componentDidMount = () => {
    const {
      fetchAllWidgets,
      activeTelescope,
      fetchWeatherSatellite,
    } = this.props;
    const { observatoryData } = activeTelescope;
    const {
      DayNightBarPanelWidgetId,
      obsId,
      DayNightMapWidgetId,
      SatelliteWidgetId,
    } = observatoryData;
    console.log(observatoryData);
    fetchAllWidgets({ obsId, DayNightBarPanelWidgetId, DayNightMapWidgetId });
    fetchWeatherSatellite({ obsId, SatelliteWidgetId });
  };

  render() {
    const {
      activeTelescopeMission,
      observatoryList,
      fetchingObservatoryStatus,
      currentObservatory,
      currentTelescope,
      allObservatoryTelescopeStatus,
      objectDetails,
      params,
      activeInstrumentID,
      teleInstrumentList,
      activeTelescope,
      useActiveInstrumentID,
      activeInstrument,
    } = this.props;

    const {
      instrStreamCode,
      instrStreamURL,
      instrStreamThumbnailQuality,
      instrSystem,
      instrPort,
      instrCameraSourceType,
    } = activeInstrument;

    return (
      <div className="details-root">
        <DisplayAtBreakpoint screenLarge screenXLarge>
          <div className="viewer">
            <DeviceContext.Consumer>
              {context =>
                context.isScreenLarge || context.isScreenXLarge ? (
                  <div>
                    <InstrumentNavigation
                      instruments={teleInstrumentList}
                      activeInstrumentID={useActiveInstrumentID}
                      handleInstrumentClick={
                        this.handleInstrumentNavigationClick
                      }
                    />
                    {/* The Solar Telescope uses a Live Video Stream from YT as opposed to an SSE feed for other telescopes */}
                    {activeInstrument.instrImageSourceType === 'video' && (
                      <div>
                        <VideoImageLoader
                          teleStreamCode={instrStreamCode}
                          teleStreamURL={instrStreamURL}
                          teleStreamThumbnailVideoWidth="810"
                          teleStreamThumbnailVideoHeight="600"
                          teleStreamThumbnailQuality={
                            instrStreamThumbnailQuality
                          }
                          teleSystem={instrSystem}
                          telePort={instrPort}
                          cameraSourceType={instrCameraSourceType}
                          showOverlay={false}
                          autoplay={1}
                        />
                      </div>
                    )}
                    {activeInstrument.instrImageSourceType !== 'video' && (
                      <TelescopeImageViewerController
                        activeInstrumentID={activeInstrument.instrUniqueId}
                        render={({ viewportHeight }) =>
                          provideLiveFeed({
                            viewportHeight,
                            fetchingOnlineStatus: fetchingObservatoryStatus,
                            obsAlert: currentObservatory.obsAlert,
                            onlineStatus: false,
                            instrument: activeInstrument,
                            offlineImageSource:
                              activeInstrument.instrOfflineImgURL,
                            activeMission: activeTelescopeMission.maskDataArray,
                            timestamp: activeTelescopeMission.timestamp,
                            missionStart: activeTelescopeMission.missionStart,
                            missionEnd: activeTelescopeMission.expires,
                            activeNeoview: activeInstrument.instrHasNeoView,
                            handleInfoClick: this.toggleNeoview,
                          })
                        }
                      />
                    )}
                  </div>
                ) : null
              }
            </DeviceContext.Consumer>
          </div>
        </DisplayAtBreakpoint>
        <style jsx>{style}</style>
        <div className="column">
          <ColumnTabs
            {...this.props}
            tabConfiguration={[
              {
                tabTitle: 'Live',
                content: () => (
                  <TabLive
                    activeTelescope={activeTelescope}
                    obsId={currentObservatory.obsId}
                    skyChartWidgetID={currentObservatory.SkychartWidgetId}
                    allSkyWidgetID={currentObservatory.AllskyWidgetId}
                    mission={activeTelescopeMission}
                    object={objectDetails.objectData}
                    renderTelescopeViewer={() =>
                      activeInstrument.instrImageSourceType === 'video' ? (
                        <div>
                          <VideoImageLoader
                            teleStreamCode={instrStreamCode}
                            teleStreamURL={instrStreamURL}
                            teleStreamThumbnailVideoWidth="810"
                            teleStreamThumbnailVideoHeight="600"
                            teleStreamThumbnailQuality={
                              instrStreamThumbnailQuality
                            }
                            teleSystem={instrSystem}
                            telePort={instrPort}
                            cameraSourceType={instrCameraSourceType}
                            showOverlay={false}
                            autoplay={1}
                          />
                        </div>
                      ) : (
                        <TelescopeImageViewerController
                          activeInstrumentID={activeInstrument.instrUniqueId}
                          render={({ viewportHeight }) =>
                            provideLiveFeed({
                              viewportHeight,
                              fetchingOnlineStatus: fetchingObservatoryStatus,
                              obsAlert: currentObservatory.obsAlert,
                              onlineStatus: false,
                              instrument: activeInstrument,
                              offlineImageSource:
                                activeInstrument.instrOfflineImgURL,
                              activeMission:
                                activeTelescopeMission.maskDataArray,
                              timestamp: activeTelescopeMission.timestamp,
                              missionStart: activeTelescopeMission.missionStart,
                              missionEnd: activeTelescopeMission.expires,
                              activeNeoview: activeInstrument.instrHasNeoView,
                              handleInfoClick: this.toggleNeoview,
                            })
                          }
                        />
                      )
                    }
                  />
                ),
              },
              {
                tabTitle: 'Queue',
                content: () => <TabQueue {...this.props} />,
              },
              {
                tabTitle: 'Cond.',
                content: () => (
                  <TabConditions
                    obsId={currentObservatory.obsId}
                    allSkyWidgetID={currentObservatory.AllskyWidgetId}
                    {...this.props}
                  />
                ),
              },
              {
                tabTitle: 'Scope',
                content: () => <TabTelescope {...this.props} />,
              },
            ]}
          />
        </div>
      </div>
    );
  }
}

function provideLiveFeed({
  viewportHeight,
  fetchingOnlineStatus,
  obsAlert,
  onlineStatus,
  instrument,
  offlineImageSource,
  activeMission,
  timestamp,
  missionStart,
  missionEnd,
  activeNeoview,
  handleInfoClick,
}) {
  return (
    <LiveFeed
      viewportHeight={viewportHeight}
      fetchingOnlineStatus={fetchingOnlineStatus}
      obsAlert={obsAlert}
      onlineStatus={onlineStatus}
      instrument={instrument}
      offlineImageSource={offlineImageSource}
      activeMission={activeMission}
      timestamp={timestamp}
      missionStart={missionStart}
      missionEnd={missionEnd}
      activeNeoview={activeNeoview}
      handleInfoClick={handleInfoClick}
    />
  );
}
