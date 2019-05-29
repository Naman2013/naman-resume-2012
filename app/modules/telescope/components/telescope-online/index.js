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
      fetchDomeCamAction,
      fetchObservatoryWebcam,
      currentObservatory,
    } = this.props;
    const { observatoryData } = activeTelescope;
    const { AllskyWidgetId } = currentObservatory;
    const {
      DayNightBarPanelWidgetId,
      obsId,
      DayNightMapWidgetId,
      SatelliteWidgetId,
      DomecamWidgetId,
      FacilityWebcamWidgetId,
      DayNightBarWidgetId,
    } = observatoryData;
    fetchAllWidgets({
      obsId,
      DayNightBarPanelWidgetId,
      DayNightMapWidgetId,
      DayNightBarWidgetId,
      AllskyWidgetId,
    });
    fetchWeatherSatellite({ obsId, SatelliteWidgetId });
    fetchDomeCamAction({ obsId, DomecamWidgetId });
    fetchObservatoryWebcam({
      obsId,
      facilityWebcamWidgetId: FacilityWebcamWidgetId,
    });
  };

  fetchAllTelescopeStatus(obsUniqueId = 0) {
    const { observatoryList, params } = this.props;
    this.props.fetchAllTelescopeStatus({
      obsId: observatoryList.find(
        observatory =>
          observatory.obsUniqueId === (obsUniqueId || params.obsUniqueId)
      ).obsId,
      teleUniqueId: params.teleUniqueId,
    });
  }

  render() {
    const {
      activeTelescopeMission,
      fetchingObservatoryStatus,
      currentObservatory,
      objectDetails,
      activeTelescope,
      activeInstrumentID,
      currentInstrument,
      countdownList,
      params,
    } = this.props;

    const {
      instrStreamCode,
      instrStreamURL,
      instrStreamThumbnailQuality,
      instrSystem,
      instrPort,
      instrCameraSourceType,
      instrStarShareCamera,
    } = currentInstrument;

    const { teleUniqueId } = params;

    const currentMissionCountdown = countdownList.find(
      countdown => countdown.teleUniqueId === teleUniqueId
    );

    return (
      <div className="details-root">
        <DisplayAtBreakpoint screenLarge screenXLarge>
          <div className="viewer">
            <DeviceContext.Consumer>
              {context =>
                context.isScreenLarge || context.isScreenXLarge ? (
                  <div>
                    {/* The Solar Telescope uses a Live Video Stream
                          from YT as opposed to an SSE feed
                          for other telescopes */}
                    {currentInstrument.instrImageSourceType === 'video' && (
                      <div>
                        <VideoImageLoader
                          instrStarShareCamera={instrStarShareCamera}
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
                    {currentInstrument.instrImageSourceType !== 'video' && (
                      <TelescopeImageViewerController
                        activeInstrumentID={activeInstrumentID}
                        instrStarShareCamera={instrStarShareCamera}
                        render={({ viewportHeight }, onImageChange) =>
                          provideLiveFeed(
                            {
                              viewportHeight,
                              fetchingOnlineStatus: fetchingObservatoryStatus,
                              obsAlert: currentObservatory.obsAlert,
                              onlineStatus: 'online',
                              instrument: currentInstrument,
                              offlineImageSource:
                                currentInstrument.instrOfflineImgURL,
                              activeMission:
                                activeTelescopeMission.maskDataArray,
                              timestamp: activeTelescopeMission.timestamp,
                              missionStart: activeTelescopeMission.missionStart,
                              missionEnd: activeTelescopeMission.expires,
                              activeNeoview: currentInstrument.instrHasNeoView,
                              handleInfoClick: this.toggleNeoview,
                            },
                            onImageChange
                          )
                        }
                      />
                    )}
                  </div>
                ) : null
              }
            </DeviceContext.Consumer>
          </div>
        </DisplayAtBreakpoint>

        <div className="column">
          <ColumnTabs
            {...this.props}
            tabConfiguration={[
              {
                tabTitle: 'Live',
                content: () => (
                  <TabLive
                    obsId={currentObservatory.obsId}
                    skyChartWidgetID={currentObservatory.SkychartWidgetId}
                    allSkyWidgetID={currentObservatory.AllskyWidgetId}
                    mission={activeTelescopeMission}
                    activeTelescope={activeTelescope}
                    object={objectDetails.objectData}
                    fetchAllTelescopeStatus={this.fetchAllTelescopeStatus}
                    currentObservatory={currentObservatory}
                    currentMissionCountdown={currentMissionCountdown}
                    renderTelescopeViewer={() => (
                      <div>
                        {currentInstrument.instrImageSourceType === 'video' ? (
                          <div>
                            <VideoImageLoader
                              instrStarShareCamera={instrStarShareCamera}
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
                            activeInstrumentID={activeInstrumentID}
                            instrStarShareCamera={instrStarShareCamera}
                            render={({ viewportHeight }, onImageChange) =>
                              provideLiveFeed(
                                {
                                  viewportHeight,
                                  fetchingOnlineStatus: fetchingObservatoryStatus,
                                  obsAlert: currentObservatory.obsAlert,
                                  onlineStatus: 'online',
                                  instrument: currentInstrument,
                                  offlineImageSource:
                                    currentInstrument.instrOfflineImgURL,
                                  activeMission:
                                    activeTelescopeMission.maskDataArray,
                                  timestamp: activeTelescopeMission.timestamp,
                                  missionStart:
                                    activeTelescopeMission.missionStart,
                                  missionEnd: activeTelescopeMission.expires,
                                  activeNeoview:
                                    currentInstrument.instrHasNeoView,
                                  handleInfoClick: this.toggleNeoview,
                                },
                                onImageChange
                              )
                            }
                          />
                        )}
                      </div>
                    )}
                  />
                ),
              },
              {
                tabTitle: 'Queue',
                content: () => <TabQueue {...this.props} />,
              },
              {
                tabTitle: 'Cond.',
                content: () => <TabConditions {...this.props} />,
              },
              {
                tabTitle: 'Scope',
                content: () => <TabTelescope {...this.props} />,
              },
            ]}
          />
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}
function provideLiveFeed(
  {
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
  },
  onImageChange
) {
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
      onImageChange={onImageChange}
    />
  );
}
