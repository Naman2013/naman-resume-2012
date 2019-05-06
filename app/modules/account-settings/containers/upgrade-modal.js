// @flow

import { UpgradeModal } from 'app/modules/account-settings/components/upgrade-modal';
import {
  makeSubscriptionPlansSelector,
  makeSubscriptionPlansFetchingSelector,
} from 'app/modules/account-settings/selectors';
import { getSubscriptionPlans } from 'app/modules/account-settings/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  subscriptionPlans: makeSubscriptionPlansSelector(),
  isFetching: makeSubscriptionPlansFetchingSelector(),
});

const mapDispatchToProps = {
  getSubscriptionPlans,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UpgradeModal);
