// @flow

import { EditPaymentModal } from 'app/modules/account-settings/components/editpayment-modal';
import {
  makeSubscriptionPlansDataSelector,
  makeSubscriptionPlansFetchingSelector,
} from 'app/modules/account-settings/selectors';
import { getSubscriptionPlans } from 'app/modules/account-settings/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  subscriptionPlansData: makeSubscriptionPlansDataSelector(),
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
)(EditPaymentModal);
