import { compose } from 'redux';
import { connect } from 'react-redux';
import { getMissionDetails } from '../thunks';
import MissionDetails from '../components/mission-details';

// TODO: selectors

const mapStateToProps = ({ missionDetails }) => {
  return {
    isFetching: missionDetails.isFetching,
    missionTitle: missionDetails.missionTitle,
    missionIconURL: missionDetails.missionIconURL,
    missionDateCreated: missionDetails.missionDateCreated,
    imageCount: missionDetails.imageCount,
    imageList: missionDetails.imageList,
    apiURL: missionDetails.apiURL,
  };
};

const mapDispatchToProps = {
  getMissionDetails,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MissionDetails);
