import {
  fetchObjectDataAction,
  resetObjectData,
} from 'app/modules/object-details/actions';
import {
  bootstrapTelescopeDetails,
  fetchAllTelescopeStatus,
  setObservatory,
  setTelescope,
  updateCurrentInstrument,
} from 'app/modules/telescope-details/actions';
import { TelescopeDetails } from 'app/modules/telescope/components/telescope-details/telescope-details';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
// import { createStructuredSelector } from 'reselect';

// const mapStateToProps = createStructuredSelector({});
//
// const mapDispatchToProps = {};

// todo refactor me
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
    allObservatoryTelescopeStatus:
      telescopeDetails.allObservatoryTelescopeStatus,

    currentObservatory: telescopeDetails.currentObservatory,
    currentTelescope: telescopeDetails.currentTelescope,
    currentInstrument: telescopeDetails.currentInstrument,

    countdownList:
      telescopeDetails.allObservatoryTelescopeStatus.countdownList
        .countdownTeleList,
    statusList:
      telescopeDetails.allObservatoryTelescopeStatus.statusList.statusTeleList,

    isImageViewerClipped: telescopeDetails.isImageViewerClipped,

    observatoryList: observatoryList.observatoryList,
    observatoryListTimestamp: observatoryList.observatoryListTimestamp,

    activeTelescopeMission: activeTelescopeMissions.activeTelescopeMission,

    activeDetailsSSE: telescopeDetails.activeSSE,
    objectDetails: objectDetails,
  };
};

// todo refactor actions
const mapDispatchToProps = {
  bootstrapTelescopeDetails,
  setObservatory,
  setTelescope,
  fetchAllTelescopeStatus,
  fetchObjectDataAction,
  resetObjectData,
  updateCurrentInstrument,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TelescopeDetails);
