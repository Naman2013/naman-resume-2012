import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { AccountPreferences } from '../components/account-preferences';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountPreferences);
