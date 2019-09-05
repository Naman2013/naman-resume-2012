import { getDashboardFeaturedObjects } from 'app/modules/dashboard/actions';
import { Dashboard } from 'app/modules/dashboard/components/dashboard';
import { connect } from 'react-redux';
import { compose } from 'redux';

const mapStateToProps = ({ user }) => ({
  user,
});
const mapDispatchToProps = {
  getDashboardFeaturedObjects,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Dashboard);
