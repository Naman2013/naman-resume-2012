import telescopeConfig from 'app/components/Telescope/telescopeConfig';

import { TelescopeNavigation } from 'app/modules/telescope/components/old';
import TelescopeOffline from 'app/modules/telescope/containers/telescope-offline';
import TelescopeOnline from 'app/modules/telescope/containers/telescope-online';

import {
  buildNavigationOptions,
  findActiveTelescopeIndex,
  getActiveTelescopeConfig,
} from 'app/modules/telescope/utils';
import first from 'lodash/first';
import moment from 'moment';
import React, { Component } from 'react';

export class TelescopeDetails extends Component {
  // dedicated timer for refreshing telescope status
  workingRefreshTimestamp = 0;

  refreshTelescopeStatusTimeout = null;

  componentDidMount() {
    const { getTelescopes } = this.props;
    getTelescopes();
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

  componentWillUnmount() {
    clearTimeout(this.refreshTelescopeStatusTimeout);
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
      user,
      dayNightBar,
      dayNightBarPanel,
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

    return (
      <div>
        <TelescopeNavigation
          options={navigationOptions}
          selectedIndex={selectedNavigationIndex}
          activeInstrumentID={activeInstrumentID}
          currentInstrumentName={currentInstrument.instrTelescopeShortName}
          title={activeTelescopeMission.objectTitle}
          updateCurrentInstrument={updateCurrentInstrument}
        />
        {/* Telescope: Offline State */}
        {activeTelescopeStatus &&
          activeTelescopeStatus.onlineStatus === 'offline' && (

            <TelescopeOffline
              {...this.props}
              key={`currentTelescopeId-${currentTelescope.teleId}`}
              currentTelescope={currentTelescope}
              currentObservatory={currentObservatory}
              currentInstrument={currentInstrument}
              allObservatoryTelescopeStatus={allObservatoryTelescopeStatus}
              activeTelescopeStatus={activeTelescopeStatus}
            />
          )}
        {/* Telescope: Online State */}
        {activeTelescopeStatus &&
          activeTelescopeStatus.onlineStatus === 'online' && (
            <TelescopeOnline
              {...this.props}
              activeInstrumentID={activeInstrumentID}
              activeTelescope={activeTelescope}
              currentInstrument={currentInstrument}
            />
          )}
      </div>
    );
  }
}
