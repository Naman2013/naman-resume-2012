import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './VanillaButton.style';

const VanillaButton = ({ children, theme, handleClick }) => (
  <Fragment>
    <button onClick={handleClick} style={theme}>
      {children}
    </button>
    <style jsx>{style}</style>
  </Fragment>
);

VanillaButton.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}),
  handleClick: PropTypes.func.isRequired,
};
VanillaButton.defaultProps = { theme: {} };
export default VanillaButton;
