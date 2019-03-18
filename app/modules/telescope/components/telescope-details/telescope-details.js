import telescopeConfig from 'app/components/Telescope/telescopeConfig';
import { TelescopeNavigation } from 'app/modules/telescope/components/old';
import TelescopeOffline from 'app/modules/telescope/containers/telescope-offline';
import TelescopeOnline from 'app/modules/telescope/containers/telescope-online';

import {
  buildNavigationOptions,
  findActiveTelescopeIndex,
  getActiveTelescopeConfig,
  telescopeDetailsURL,
} from 'app/modules/telescope/utils';
import first from 'lodash/first';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

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

  handleOptionChange = event => {
    const { observatoryList } = this.props;
    const options = buildNavigationOptions(observatoryList);

    if (event.currentTarget && event.currentTarget.dataset.index) {
      const {
        currentTarget: {
          dataset: { index },
        },
      } = event;
      browserHistory.push(telescopeDetailsURL(options[index]));
    } else {
      const { value } = event;
      browserHistory.push(telescopeDetailsURL(options[value]));
    }
  };

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
      objectDetails,
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

    const activeInstrument =
      first(
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
        {/* Telescope: Online State */}
        {activeTelescopeStatus &&
          activeTelescopeStatus.onlineStatus === 'online' && (
            <TelescopeOnline
              {...this.props}
              activeInstrumentID={activeInstrumentID}
              activeTelescope={activeTelescope}
              teleInstrumentList={teleInstrumentList}
              useActiveInstrumentID={useActiveInstrumentID}
              activeInstrument={activeInstrument}
            />
          )}
      </div>
    );
  }
}
