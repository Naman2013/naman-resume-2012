import { connect } from 'react-redux';
import { compose } from 'redux';
import { getDashboardPopupInfo } from '../thunks';
import { TakeATour } from '../components/take-a-tour';

const mapStateToProps = ({ accountSettings }) => {
  return {
    dashboardPopupInfo: accountSettings.dashboardPopupInfo,
  };
};

const mapDispatchToProps = {
  getDashboardPopupInfo,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TakeATour);
