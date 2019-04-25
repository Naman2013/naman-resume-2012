import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeAccountTypeSectionSelector } from '../selectors';
import { AccountDetails } from '../components/account-details';

const mapStateToProps = createStructuredSelector({
  accountTypeSection: makeAccountTypeSectionSelector(),
  accountDetails: makeAccountDetailsSelector(),
  accountCancelSection: makeAccountCancelSectionSelector(),
});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountDetails);
