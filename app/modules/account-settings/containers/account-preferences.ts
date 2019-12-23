import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ACTION } from 'app/modules/account-settings/reducer';
import { makeAccountPreferencesSelector } from 'app/modules/account-settings/selectors';
import { AccountPreferences } from '../components/account-preferences';

const mapStateToProps = createStructuredSelector({
  accountPreferences: makeAccountPreferencesSelector(),
});

const mapDispatchToProps = {
  setAccountPreference: ACTION.setAccountPreference,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountPreferences);
