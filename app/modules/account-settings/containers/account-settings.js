import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { AccountSettings } from '../components/account-settings';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountSettings);
