import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { AccountDetails } from '../components/account-details';


// const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

export default compose(
  connect(
    state => {
      return {
        accountTypeItems: state.accountSettings.accountTypeItems,
        accountDetailsOptions: state.accountSettings.accountDetailsOptions,
        paymentDetailsOptions: state.accountSettings.paymentDetailsOptions
      }
    },
    mapDispatchToProps
  )
)(reduxForm({ form: 'accountDetails', enableReinitialize: true })(AccountDetails));

