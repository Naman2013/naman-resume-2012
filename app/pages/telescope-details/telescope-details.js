import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Fade from 'components/common/Fade';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import { ColumnTabs } from 'components/common/Tabs';
import telescopeConfig from 'components/Telescope/telescopeConfig';
import FAUX_MISSIONS from 'content/fauxMissions';
import {
  TabConditions,
  TabLive,
  TabQueue,
  TabTelescope,
  TelescopeNavigation,
  TelescopeViewer,
} from 'components/telescope-details/v4-modules';

import {
  bootstrapTelescopeDetails,
  setObservatory,
  setTelescope,
  updateTelescopeStatus,
  fetchAllTelescopeStatus,
} from 'modules/telescope-details/actions';

import {
  fetchObjectDataAction,
  resetObjectData,
} from 'modules/object-details/actions';

import {
  buildNavigationOptions,
  telescopeDetailsURL,
  findActiveTelescopeIndex,
  getActiveTelescopeConfig
} from 'utils/telescope-details';

import style from './v4-telescope-details.style';

class TelescopeDetails extends Component {
  static propTypes = {
    // actions
    bootstrapTelescopeDetails: PropTypes.func.isRequired,
    setObservatory: PropTypes.func.isRequired,
    setTelescope: PropTypes.func.isRequired,
    updateTelescopeStatus: PropTypes.func.isRequired,
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
    currentTelescopeOnlineStatus: PropTypes.string,
    // countdownList
    // isImageViewerClipped: PropTypes.bool.isRequired,
    observatoryList: PropTypes.arrayOf(PropTypes.shape({
      obsTelescopes: PropTypes.arrayOf(PropTypes.shape({
        teleUniqueId: PropTypes.string.isRequired,
        teleLogoURL: PropTypes.string.isRequired,
      }))
    })),
    // observatoryListTimestamp
    // activeTelescopeMission
    activeDetailsSSE: PropTypes.shape({
      astroObjectID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired,
    // objectDetails
  };

  static defaultProps = {
    observatoryList: [],
  }

  constructor(props) {
    super(props);
    this.scaffoldPage();
  }

  state = {
    telescopeIDHistory: [
      this.props.params.teleUniqueId,
      this.props.params.teleUniqueId],
  };

  static getDerivedStateFromProps(props, state) {
    const { telescopeIDHistory } = state;
    const [old, latest] = telescopeIDHistory;
    const { params: { teleUniqueId } } = props;

    // if the new prop is different then the current new becomes old
    if (teleUniqueId !== latest) {
      return { telescopeIDHistory: [latest, teleUniqueId] };
    }
    return null;
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

    if (event.currentTarget.dataset.index) {
      const { currentTarget: { dataset: { index } } } = event;
      browserHistory.push(telescopeDetailsURL(options[index]));
    } else {
      const { target: { value } } = event;
      browserHistory.push(telescopeDetailsURL(options[value]));
    }
  }

  render() {
    const { telescopeIDHistory } = this.state;
    const { observatoryList, params } = this.props;
    const navigationOptions = buildNavigationOptions(observatoryList);
    const selectedNavigationIndex =
      findActiveTelescopeIndex(navigationOptions, params.teleUniqueId);
    const activeTelescope = navigationOptions[selectedNavigationIndex];
    const activeTelescopeConfig = getActiveTelescopeConfig(telescopeConfig, activeTelescope);

    // page level validation that we have the information we need
    // before rendering details
    if (!activeTelescopeConfig.isValidTelescope) { return null; }

    return (
      <div>
        <TelescopeNavigation
          title="Great barred spiral galaxy"
          options={navigationOptions}
          onSelect={this.handleOptionChange}
          selectedIndex={selectedNavigationIndex}
        />

        <div className="details-root">
          <DisplayAtBreakpoint screenLarge screenXLarge>
            <div className="viewer">
              <TelescopeViewer
                missionMetaData={FAUX_MISSIONS.nonMission}
                activeInstrumentID={activeTelescopeConfig.instrumentID}
                previousInstrumentID={telescopeConfig[telescopeIDHistory[0]].instrumentID}
                increment={5}
              />
            </div>
          </DisplayAtBreakpoint>

          <div className="column">
            <ColumnTabs
              tabConfiguration={[
                {
                  tabTitle: 'Live',
                  content: () => (
                    <TabLive
                      missionMetaData={FAUX_MISSIONS.nonMission}
                      activeInstrumentID={activeTelescopeConfig.instrumentID}
                      previousInstrumentID={telescopeConfig[telescopeIDHistory[0]].instrumentID}
                      increment={5}
                    />),
                  },
                { tabTitle: 'Queue', content: () => (<TabQueue />) },
                { tabTitle: 'Cond.', content: () => (<TabConditions />) },
                { tabTitle: 'Scope', content: () => (<TabTelescope />) },
              ]}
            />
          </div>
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

const mapStateToProps = ({
  telescopeOverview,
  telescopeDetails,
  activeTelescopeMissions,
  objectDetails,
}) => {
  const { observatoryList } = telescopeOverview;

  return {
    fetchingObservatoryList: telescopeDetails.fetchingObservatoryList,
    fetchingObservatoryStatus: telescopeDetails.fetchingObservatoryStatus,
    allObservatoryTelescopeStatus: telescopeDetails.allObservatoryTelescopeStatus,

    currentObservatory: telescopeDetails.currentObservatory,
    currentTelescope: telescopeDetails.currentTelescope,
    currentTelescopeOnlineStatus: telescopeDetails.currentTelescopeOnlineStatus,

    countdownList: telescopeDetails.allObservatoryTelescopeStatus.countdownList.countdownTeleList,

    isImageViewerClipped: telescopeDetails.isImageViewerClipped,

    observatoryList: observatoryList.observatoryList,
    observatoryListTimestamp: observatoryList.observatoryListTimestamp,

    activeTelescopeMission: activeTelescopeMissions.activeTelescopeMission,

    activeDetailsSSE: telescopeDetails.activeSSE,
    objectDetails: objectDetails.objectData,
  };
};

const mapDispatchToProps = dispatch => (bindActionCreators({
  bootstrapTelescopeDetails,
  setObservatory,
  setTelescope,
  updateTelescopeStatus,
  fetchAllTelescopeStatus,
  fetchObjectDataAction,
  resetObjectData,
}, dispatch));
const ConnectedTelescopeDetails = connect(mapStateToProps, mapDispatchToProps)(TelescopeDetails);

export { TelescopeDetails, ConnectedTelescopeDetails };
