import { compose } from 'redux';
import { connect } from 'react-redux';
import { getMissionDetails } from '../thunks';
import MissionDetails from '../components/mission-details';

// TODO: selectors

const mapStateToProps = ({ missionDetails }) => {
  return {
    missionTitle: missionDetails.missionTitle,
    missionIconURL: missionDetails.missionIconURL,
    missionDateCreated: missionDetails.missionDateCreated,
    firstImageNumber: missionDetails.firstImageNumber,
    imageCount: missionDetails.imageCount,
    maxImageCount: missionDetails.maxImageCount,
    imageList: missionDetails.imageList,
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
