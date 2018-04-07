import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

export default Logout;
