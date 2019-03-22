import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import { ColumnTabs } from 'app/components/common/Tabs';
import VideoImageLoader from 'app/components/common/telescope-image-loader/video-image-loader';
import LiveFeed from 'app/components/telescope-details/live-feed-v3';
import TelescopeImageViewerController from 'app/components/telescope-details/TelescopeImageViewerController';

import {
  TabConditions,
  TabLive,
  TabQueue,
  TabTelescope,
  TelescopeNavigation,
} from 'app/modules/telescope/components/old';
import telescopeConfig from 'app/components/Telescope/telescopeConfig';
import TelescopeOffline from 'app/modules/telescope/containers/telescope-offline';

import {
  buildNavigationOptions,
  findActiveTelescopeIndex,
  getActiveTelescopeConfig,
} from 'app/modules/telescope/utils';
import { DeviceContext } from 'app/providers/DeviceProvider';
import first from 'lodash/first';
import moment from 'moment';
import React, { Component } from 'react';

import style from './v4-telescope-details.style';

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
},
  onImageChange) {
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

type TTelescopeDetails = {
  bootstrapTelescopeDetails: Function,
  setObservatory: Function,
  setTelescope: Function,
  fetchAllTelescopeStatus: Function,
  fetchObjectDataAction: Function,
  resetObjectData: Function,
  updateCurrentInstrument: Function,
  params: {
    obsUniqueId: string,
    teleUniqueId: string,
  },
  fetchingObservatoryList: boolean,
  fetchingObservatoryStatus: boolean,
  currentObservatory: Object,
  currentTelescope: Object,
  observatoryList: Array<Object>,
  activeDetailsSSE: {
    astroObjectID: string | number,
  },
};

export class TelescopeDetails extends Component<TTelescopeDetails> {
  // dedicated timer for refreshing telescope status
  workingRefreshTimestamp = 0;

  refreshTelescopeStatusTimeout = null;

  componentDidMount() {
    this.scaffoldPage();
  }

  componentDidUpdate(prevProps) {
    const {
      allObservatoryTelescopeStatus,
      observatoryList,
      params: { obsUniqueId, teleUniqueId },
      activeDetailsSSE: { astroObjectID },
      setObservatory,
      setTelescope,
      fetchAllTelescopeStatus,
      fetchObjectDataAction,
      resetObjectData,
    } = this.props;

    const isTelescopeUpdate = teleUniqueId !== prevProps.params.teleUniqueId;
    const isObservatoryUpdate = obsUniqueId !== prevProps.params.obsUniqueId;
    const isNewAstroObjectID =
      astroObjectID &&
      this.props.activeDetailsSSE.astroObjectID !== astroObjectID;
    const activeObservatory = observatoryList.filter(
      observatory => observatory.obsUniqueId === obsUniqueId
    )[0];

    if (
      allObservatoryTelescopeStatus &&
      allObservatoryTelescopeStatus.statusExpires
    ) {
      this.scaffoldRefreshInterval(allObservatoryTelescopeStatus.statusExpires);
    }

    if (isObservatoryUpdate) {
      // set the selected observatory
      setObservatory({ obsUniqueId, teleUniqueId });

      // reset the timer to refetch the telescope
      // status since we are calling it now anyhow
      this.scaffoldRefreshInterval();
    }

    if (isTelescopeUpdate) {
      // set the selected telescope
      setTelescope({ obsUniqueId, teleUniqueId });

      fetchAllTelescopeStatus({
        teleUniqueId,
        obsId: activeObservatory.obsId,
        isRefresh: true,
      });
    }

    if (isNewAstroObjectID) fetchObjectDataAction(astroObjectID);

    if (this.props.activeDetailsSSE.astroObjectID > 0 && astroObjectID === 0) {
      resetObjectData();
    }
  }

  scaffoldRefreshInterval(expirationTimestamp = 0) {
    if (this.workingRefreshTimestamp !== expirationTimestamp) {
      this.workingRefreshTimestamp = expirationTimestamp;
      clearTimeout(this.refreshTelescopeStatusTimeout);

      // diff in milliseconds from now and the expires time...
      const convertedExpirestamp = expirationTimestamp * 1000;
      const nowStamp = moment.utc().valueOf();
      const refreshInterval = convertedExpirestamp - nowStamp;

      // validation of the refreshInterval to prevent bad timeout values
      if (refreshInterval <= 0) {
        return;
      }

      this.refreshTelescopeStatusTimeout = setTimeout(() => {
        const {
          observatoryList,
          params: { obsUniqueId, teleUniqueId },
          fetchAllTelescopeStatus,
        } = this.props;
        fetchAllTelescopeStatus({
          obsId: observatoryList.find(
            observatory => observatory.obsUniqueId === obsUniqueId
          ).obsId,
          teleUniqueId,
          isRefresh: true,
        });
      }, refreshInterval);
    }
  }

  scaffoldPage() {
    const {
      params: { obsUniqueId, teleUniqueId },
      activeDetailsSSE: { astroObjectID },
      bootstrapTelescopeDetails,
      fetchObjectDataAction,
      resetObjectData,
    } = this.props;

    bootstrapTelescopeDetails({ obsUniqueId, teleUniqueId });

    if (astroObjectID) {
      fetchObjectDataAction(astroObjectID);
    } else {
      resetObjectData();
    }
  }

  render() {
    const {
      activeTelescopeMission,
      observatoryList,
      fetchingObservatoryStatus,
      currentObservatory,
      currentTelescope,
      currentInstrument,
      allObservatoryTelescopeStatus,
      objectDetails,
      params,
      countdownList,
      updateCurrentInstrument,
    } = this.props;
    if (
      !observatoryList.length ||
      !countdownList.length ||
      !currentInstrument
    ) {
      return null;
    }

    const activeInstrumentID = currentInstrument.instrUniqueId;
    const navigationOptions = buildNavigationOptions(observatoryList);
    const selectedNavigationIndex = findActiveTelescopeIndex(
      navigationOptions,
      params.teleUniqueId
    );
    const activeTelescope = navigationOptions[selectedNavigationIndex];
    const activeTelescopeConfig = getActiveTelescopeConfig(
      telescopeConfig,
      activeTelescope
    );

    // page level validation that we have the information we need
    // before rendering details
    if (!activeTelescopeConfig.isValidTelescope) return null;

    const activeTelescopeStatus = first(
      allObservatoryTelescopeStatus.statusList.statusTeleList.filter(
        telescope =>
          telescope.teleUniqueId === activeTelescope.telescopeUniqueID
      )
    );

    const {
      instrStreamCode,
      instrStreamURL,
      instrStreamThumbnailQuality,
      instrSystem,
      instrPort,
      instrCameraSourceType,
      instrTelescopeShortName
    } = currentInstrument;
    return (
      <div>
        <TelescopeNavigation
          options={navigationOptions}
          selectedIndex={selectedNavigationIndex}
          activeInstrumentID={activeInstrumentID}
          currentInstrumentName={instrTelescopeShortName}
          title={activeTelescopeMission.objectTitle}
          updateCurrentInstrument={updateCurrentInstrument}
        />
        {/* Telescope: Offline State */}
        {activeTelescopeStatus &&
          activeTelescopeStatus.onlineStatus === 'offline' && (
            <TelescopeOffline currentTelescope={currentTelescope} />
          )}
        {/*(
        <div className="details-root">
          <p>{currentTelescope.teleName} is Offline.....</p>
        </div>
        )}*/}
        {/* Telescope: Online State */}
        {activeTelescopeStatus &&
          activeTelescopeStatus.onlineStatus === 'online' && (
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
                          {currentInstrument.instrImageSourceType ===
                            'video' && (
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
                          {currentInstrument.instrImageSourceType !==
                            'video' && (
                              <TelescopeImageViewerController
                                activeInstrumentID={activeInstrumentID}
                                render={({ viewportHeight }, onImageChange) =>
                                  provideLiveFeed({
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
                                  onImageChange)
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
                          object={objectDetails.objectData}
                          renderTelescopeViewer={() =>
                            currentInstrument.instrImageSourceType ===
                              'video' ? (
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
                                  activeInstrumentID={activeInstrumentID}
                                  render={({ viewportHeight }, onImageChange) =>
                                    provideLiveFeed({
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
                                    onImageChange)
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
          )}
        <style jsx>{style}</style>
      </div>
    );
  }
}
