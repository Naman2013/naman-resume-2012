import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from 'modules/User';

const mapDispatchToProps = () => (bindActionCreators({
  signOut: logout,
}));

const Logout = ({ buttonText, signOut, theme }) => (
  <button style={theme} onClick={signOut}>{buttonText}</button>
);

Logout.propTypes = {
  buttonText: PropTypes.string,
  signOut: PropTypes.func.isRequired,
};

Logout.defaultProps = {
  buttonText: 'Sign out',
};

export default connect(null, mapDispatchToProps)(Logout);
