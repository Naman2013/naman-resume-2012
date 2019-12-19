import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getDashboardFeaturedObjects } from 'app/modules/dashboard/actions';
import { Dashboard } from 'app/modules/dashboard/components/dashboard';
import { getGuestDashboard } from 'app/modules/dashboard/thunks';
import { makeGuestDashboardSelector } from 'app/modules/dashboard/selectors';
import { makeUserSelector } from 'app/modules/user/selectors';

const mapStateToProps = createStructuredSelector({
  guestDashboard: makeGuestDashboardSelector(),
  user: makeUserSelector(),
});

const mapDispatchToProps = {
  getDashboardFeaturedObjects,
  getGuestDashboard,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Dashboard);
