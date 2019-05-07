import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeAccountTypeSectionSelector,
  makeAccountDetailsSelector,
  makeAccountCancelSectionSelector,
} from '../selectors';
import { fetchAccountFormFieldAction } from '../thunks';
import { AccountDetails } from '../components/account-details';

const mapStateToProps = createStructuredSelector({
  accountTypeSection: makeAccountTypeSectionSelector(),
  accountDetails: makeAccountDetailsSelector(),
  accountCancelSection: makeAccountCancelSectionSelector(),
});

const mapDispatchToProps = {
  fetchAccountFormFieldAction,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountDetails);
