import { connect } from 'react-redux';
import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
// import { makeaccountTypeSectionSelector } from '../selectors';
import { AccountDetails } from '../components/account-details';

// const mapStateToProps = createStructuredSelector({
//   accountTypeSection: makeaccountTypeSectionSelector(),
// });

const mapStateToProps = ({ accountSettings }) => {
  return {
    accountTypeSection: accountSettings.accountTypeSection,
    accountDetailsOptions: accountSettings.accountDetailsOptions,
    paymentDetailsOptions: accountSettings.paymentDetailsOptions,
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountDetails);
