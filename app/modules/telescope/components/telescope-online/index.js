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

  constructor(props){
    super(props);
    props.setDock(true);
  }

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

    this.checkCurrentInstrument();

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

  componentDidUpdate() {
    this.checkCurrentInstrument();
  }

  checkCurrentInstrument = () => {
    const {
      currentTelescope,
      currentInstrument,
      updateCurrentInstrument,
    } = this.props;

    if(currentTelescope?.teleInstrumentList[0]?.instrUniqueId !== currentInstrument.instrUniqueId && currentTelescope?.teleInstrumentList[1]?.instrUniqueId !== currentInstrument.instrUniqueId) {
      updateCurrentInstrument(currentTelescope.teleInstrumentList[0]);
    }
  }

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
      weatherConditions,
      user,
      pubnubData,
      pubnubInit,
      sendMessage,
      setDock, 
      setTab, 
      unSubscribePubnub,
      getActivityFeedMembers,
      setMemberChatState,
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
          <div className="telescope-live-container">
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
                            isTelescope
                          />
                        </div>
                      )}
                      {currentInstrument.instrImageSourceType !== 'video' && (
                        <TelescopeImageViewerController
                          activeInstrumentID={activeInstrumentID}
                          instrStarShareCamera={instrStarShareCamera}
                          missionTitle={activeTelescopeMission.objectTitle}
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
                  ) : null
                }
              </DeviceContext.Consumer>
            </div>
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
                    skyChartWidgetId={currentObservatory.SkyChartWidgetId}
                    allSkyWidgetID={currentObservatory.AllskyWidgetId}
                    mission={activeTelescopeMission}
                    activeTelescope={activeTelescope}
                    object={objectDetails.objectData}
                    fetchAllTelescopeStatus={this.fetchAllTelescopeStatus}
                    activeInstrument={currentInstrument}
                    currentObservatory={currentObservatory}
                    currentMissionCountdown={currentMissionCountdown}
                    user={user}
                    pubnubData={pubnubData}
                    pubnubInit={pubnubInit}
                    sendMessage={sendMessage}
                    setDock={setDock} 
                    setTab={setTab} 
                    unSubscribePubnub={unSubscribePubnub}
                    getActivityFeedMembers={getActivityFeedMembers}
                    setMemberChatState={setMemberChatState}
                    renderTelescopeViewer={() => (
                      <div>
                        {currentInstrument.instrImageSourceType === 'video' ? (
                          <div>
                            <DeviceContext.Consumer>
                              {context =>
                                !context.isScreenLarge &&
                                !context.isScreenXLarge ? (
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
                                    isTelescope
                                  />
                                ) : null
                              }
                            </DeviceContext.Consumer>
                          </div>
                        ) : (
                          <DeviceContext.Consumer>
                            {context =>
                              !context.isScreenLarge &&
                              !context.isScreenXLarge ? (
                                <TelescopeImageViewerController
                                  activeInstrumentID={activeInstrumentID}
                                  instrStarShareCamera={instrStarShareCamera}
                                  mobileStarShare={context.isMobile}
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
                                        timestamp:
                                          activeTelescopeMission.timestamp,
                                        missionStart:
                                          activeTelescopeMission.missionStart,
                                        missionEnd:
                                          activeTelescopeMission.expires,
                                        activeNeoview:
                                          currentInstrument.instrHasNeoView,
                                        handleInfoClick: this.toggleNeoview,
                                      },
                                      onImageChange
                                    )
                                  }
                                />
                              ) : null
                            }
                          </DeviceContext.Consumer>
                        )}
                      </div>
                    )}
                  />
                ),
              },
              ...(currentInstrument.instrImageSourceType === 'video'
                ? []
                : [
                    {
                      tabTitle: 'Queue',
                      content: () => <TabQueue {...this.props} />,
                    },
                  ]),
              {
                tabTitle: 'Conditions',
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
    fullscreenMode,
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
      fullscreenMode={fullscreenMode}
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
