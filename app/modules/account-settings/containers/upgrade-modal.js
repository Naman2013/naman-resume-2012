// @flow

import { UpgradeModal } from 'app/modules/account-settings/components/upgrade-modal';
import {
  makeSubscriptionPlansDataSelector,
  makeSubscriptionPlansFetchingSelector,
} from 'app/modules/account-settings/selectors';
import { getSubscriptionPlans } from 'app/modules/account-settings/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { updateUserAt } from '../../login/actions';

const mapStateToProps = createStructuredSelector({
  subscriptionPlansData: makeSubscriptionPlansDataSelector(),
  isFetching: makeSubscriptionPlansFetchingSelector(),
});

const mapDispatchToProps = {
  getSubscriptionPlans,
  storeUserNewAT: updateUserAt,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UpgradeModal);
