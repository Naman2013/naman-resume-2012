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
  TelescopeNavigation,
} from 'app/modules/telescope/components/old';
import telescopeConfig from 'app/components/Telescope/telescopeConfig';
import TelescopeOffline from 'app/modules/telescope/containers/telescope-offline';

import {
  buildNavigationOptions,
  findActiveTelescopeIndex,
  getActiveTelescopeConfig,
  telescopeDetailsURL,
} from 'app/modules/telescope/utils';
import { DeviceContext } from 'app/providers/DeviceProvider';
import first from 'lodash/first';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

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

export class TelescopeDetails extends Component {
  static propTypes = {
    // actions
    bootstrapTelescopeDetails: PropTypes.func.isRequired,
    setObservatory: PropTypes.func.isRequired,
    setTelescope: PropTypes.func.isRequired,
    fetchAllTelescopeStatus: PropTypes.func.isRequired,
    fetchObjectDataAction: PropTypes.func.isRequired,
    resetObjectData: PropTypes.func.isRequired,

    // mapped state
    // TODO: map these..
    params: PropTypes.shape({
      obsUniqueId: PropTypes.string.isRequired,
      teleUniqueId: PropTypes.string.isRequired,
    }).isRequired,
    fetchingObservatoryList: PropTypes.bool.isRequired,
    fetchingObservatoryStatus: PropTypes.bool.isRequired,
    // allObservatoryTelescopeStatus // [countdownTeleList]
    currentObservatory: PropTypes.shape({}),
    currentTelescope: PropTypes.shape({}),
    // countdownList
    // isImageViewerClipped: PropTypes.bool.isRequired,
    observatoryList: PropTypes.arrayOf(
      PropTypes.shape({
        obsTelescopes: PropTypes.arrayOf(
          PropTypes.shape({
            teleUniqueId: PropTypes.string.isRequired,
            teleLogoURL: PropTypes.string.isRequired,
          })
        ),
      })
    ),
    // observatoryListTimestamp
    // activeTelescopeMission,
    activeDetailsSSE: PropTypes.shape({
      astroObjectID: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired,
    // objectDetails
  };

  static defaultProps = {
    observatoryList: [],
  };

  constructor(props) {
    super(props);
    this.scaffoldPage();
  }

  state = {
    telescopeIDHistory: [
      this.props.params.teleUniqueId,
      this.props.params.teleUniqueId,
    ],
    activeInstrumentID: '',
  };

  static getDerivedStateFromProps(props, state) {
    const { telescopeIDHistory } = state;
    const [old, latest] = telescopeIDHistory;
    const {
      params: { teleUniqueId },
    } = props;

    // if the new prop is different then the current new becomes old
    if (teleUniqueId !== latest) {
      return { telescopeIDHistory: [latest, teleUniqueId] };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const {
      allObservatoryTelescopeStatus,
      observatoryList,
      params: { obsUniqueId, teleUniqueId },
      activeDetailsSSE: { astroObjectID },
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
      this.props.setObservatory({
        obsUniqueId: this.props.params.obsUniqueId,
        teleUniqueId: this.props.params.teleUniqueId,
      });

      // reset the timer to refetch the telescope status since we are calling it now anyhow
      this.scaffoldRefreshInterval();
    }

    if (isTelescopeUpdate) {
      // set the selected telescope
      this.props.setTelescope({
        obsUniqueId,
        teleUniqueId,
      });

      this.props.fetchAllTelescopeStatus({
        teleUniqueId,
        obsId: activeObservatory.obsId,
        isRefresh: true,
      });
    }

    if (isNewAstroObjectID) {
      this.props.fetchObjectDataAction(astroObjectID);
    }

    if (this.props.activeDetailsSSE.astroObjectID > 0 && astroObjectID === 0) {
      this.props.resetObjectData();
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

  refreshTelescopeStatusTimeout = null;

  // dedicated timer for refreshing telescope status
  workingRefreshTimestamp = 0;

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
        } = this.props;
        this.props.fetchAllTelescopeStatus({
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
    } = this.props;

    this.props.bootstrapTelescopeDetails({
      obsUniqueId,
      teleUniqueId,
    });

    if (astroObjectID) {
      this.props.fetchObjectDataAction(astroObjectID);
    } else {
      this.props.resetObjectData();
    }
  }

  handleOptionChange = (event) => {
    const { observatoryList } = this.props;
    const options = buildNavigationOptions(observatoryList);

    if (event.currentTarget && event.currentTarget.dataset.index) {
      const { currentTarget: { dataset: { index } } } = event;
      browserHistory.push(telescopeDetailsURL(options[index]));
    } else {
      const { value } = event;
      browserHistory.push(telescopeDetailsURL(options[value]));
    }
  }

  handleInstrumentNavigationClick = instrumentID => {
    this.setState(() => ({ activeInstrumentID: instrumentID }));
  };

  render() {
    const {
      activeTelescopeMission,
      observatoryList,
      fetchingObservatoryStatus,
      currentObservatory,
      currentTelescope,
      allObservatoryTelescopeStatus,
      params,
    } = this.props;

    const { activeInstrumentID } = this.state;

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
    if (!activeTelescopeConfig.isValidTelescope) {
      return null;
    }

    // get instrument, we cannot know the instrument until after the API's have returned
    // TODO: this flow should be redesigned
    //const activeInstrument = getActiveInstrument(observatoryList, activeTelescope);

    const { teleInstrumentList } = currentTelescope;

    let useActiveInstrumentID = activeInstrumentID;
    if (activeInstrumentID === '') {
      useActiveInstrumentID = teleInstrumentList[0].instrUniqueId;
    }

    const activeInstrument = first(
      teleInstrumentList.filter(
        instrument => instrument.instrUniqueId === useActiveInstrumentID
      )
    ) || teleInstrumentList[0];

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
    } = activeInstrument;

    return (
      <div>
        <TelescopeNavigation
          title={activeTelescopeMission.objectTitle}
          options={navigationOptions}
          onSelect={this.handleOptionChange}
          selectedIndex={selectedNavigationIndex}
        />
        {/* Telescope: Offline State */}
        {activeTelescopeStatus &&
          activeTelescopeStatus.onlineStatus === 'offline' && (
            <TelescopeOffline currentTelescope={this.props.currentTelescope} />
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
                          <InstrumentNavigation
                            instruments={teleInstrumentList}
                            activeInstrumentID={useActiveInstrumentID}
                            handleInstrumentClick={
                              this.handleInstrumentNavigationClick
                            }
                          />
                          {/* The Solar Telescope uses a Live Video Stream from YT as opposed to an SSE feed for other telescopes */}
                          {activeInstrument.instrImageSourceType ===
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
                          {activeInstrument.instrImageSourceType !==
                            'video' && (
                            <TelescopeImageViewerController
                              activeInstrumentID={
                                activeInstrument.instrUniqueId
                              }
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
                                  missionStart:
                                    activeTelescopeMission.missionStart,
                                  missionEnd: activeTelescopeMission.expires,
                                  activeNeoview:
                                    activeInstrument.instrHasNeoView,
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
                          renderTelescopeViewer={() => (
                            activeInstrument.instrImageSourceType ===
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
                          ):(
                            <TelescopeImageViewerController
                              activeInstrumentID={
                                activeInstrument.instrUniqueId
                              }
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
                                  missionStart:
                                    activeTelescopeMission.missionStart,
                                  missionEnd: activeTelescopeMission.expires,
                                  activeNeoview:
                                    activeInstrument.instrHasNeoView,
                                  handleInfoClick: this.toggleNeoview,
                                })
                              }
                            />
                          )
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
