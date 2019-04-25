import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { AccountSettings } from '../components/account-settings';
import {
  makeIsFetchingSelector,
  makeAccountMenuListSelector,
} from '../selectors';
import { fetchAccountSettingsAction } from '../thunks';

const mapStateToProps = createStructuredSelector({
  isFetching: makeIsFetchingSelector(),
  accountMenuList: makeAccountMenuListSelector(),
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
