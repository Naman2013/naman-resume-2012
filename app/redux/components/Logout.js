import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from 'modules/User';

const mapDispatchToProps = () => (bindActionCreators({
  signOut: logout,
}));

const Logout = ({
  buttonText,
  signOut,
  theme,
  render
}) => (
  <a style={theme} onClick={signOut}>
    {render ? render() : buttonText}
  </a>
);

Logout.propTypes = {
  // provide text or provide a render component
  buttonText: PropTypes.string,
  signOut: PropTypes.func.isRequired,
  render: PropTypes.func,
};

Logout.defaultProps = {
  buttonText: 'Sign out',
  render: null,
};

export default connect(null, mapDispatchToProps)(Logout);
