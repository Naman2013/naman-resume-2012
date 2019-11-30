import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  purchaseConfirmationDataSelector,
  purchaseConfirmationLoadingSelector,
} from '../selectors';
import { PurchaseConfirmation } from '../components/purchase-confirmation';
import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  isLoading: purchaseConfirmationLoadingSelector(),
  purchaseConfirmationData: purchaseConfirmationDataSelector(),
});

const mapDispatchToProps = {
  getPurchaseConfirmation: ACTION.getPurchaseConfirmation,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PurchaseConfirmation);
