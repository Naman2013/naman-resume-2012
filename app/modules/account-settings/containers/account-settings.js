import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { AccountSettings } from '../components/account-settings';
import {
  makeIsFetchingSelector,
  makeAccountDetailsSelector,
  makeAccountMenuListSelector,
} from '../selectors';
import { fetchAccountSettingsAction } from '../thunks';

const mapStateToProps = createStructuredSelector({
  isFetching: makeIsFetchingSelector(),
  accountMenuList: makeAccountMenuListSelector(),
  accountDetails: makeAccountDetailsSelector(),
});

const mapDispatchToProps = {
  fetchAccountSettingsAction,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountSettings);
