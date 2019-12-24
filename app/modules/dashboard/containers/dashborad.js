import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getDashboardFeaturedObjects } from 'app/modules/dashboard/actions';
import { Dashboard } from 'app/modules/dashboard/components/dashboard';
import { getGuestDashboard } from 'app/modules/dashboard/thunks';
import {
  makeGuestDashboardSelector,
  makeDashboardFeaturedObjectsSelector,
} from 'app/modules/dashboard/selectors';
import { makeUserSelector } from 'app/modules/user/selectors';
import { getSubscriptionPlans } from 'app/modules/account-settings/thunks';
import { makeSubscriptionPlansDataSelector } from 'app/modules/account-settings/selectors';
import { makeObservatoryListSelector } from 'app/modules/telescope/selectors';
import { getObservatoryList } from 'app/modules/telescope/thunks';
import { ACTION } from 'app/modules/shows/reducer';
import { makeDashboardShowsSelector } from 'app/modules/shows/selectors';

const mapStateToProps = createStructuredSelector({
  recommendedObjects: makeDashboardFeaturedObjectsSelector(),
  guestDashboard: makeGuestDashboardSelector(),
  user: makeUserSelector(),
  subscriptionPlansData: makeSubscriptionPlansDataSelector(),
  observatoryListData: makeObservatoryListSelector(),
  dashboardShowsList: makeDashboardShowsSelector(),
});

const mapDispatchToProps = {
  getDashboardFeaturedObjects,
  getGuestDashboard,
  getSubscriptionPlans,
  getObservatoryList,
  getDashboardShows: ACTION.getDashboardShows,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Dashboard);
