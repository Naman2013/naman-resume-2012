import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { CustomerAdminTools } from '../components/customer-admin-tools';
import {
  makeIsFetchingSelector,
  makeCustomerAdminToolsSelector,
  makeCustomerAdminToolsURLSelector,
} from '../selectors';
import { fetchCustomerAdminToolsAction } from '../thunks';

const mapStateToProps = createStructuredSelector({
  isFetching: makeIsFetchingSelector(),
  customerAdminToolsURL: makeCustomerAdminToolsURLSelector(),
});

const mapDispatchToProps = {
  fetchCustomerAdminToolsAction,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CustomerAdminTools);
