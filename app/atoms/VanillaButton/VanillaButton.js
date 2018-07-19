import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './VanillaButton.style';

const VanillaButton = ({ children, theme }) => (
  <Fragment>
    <button>
      {children}
    </button>
    <style jsx>{style}</style>
    <style jsx>{`${theme}`}</style>
  </Fragment>
);

VanillaButton.propTypes = { children: PropTypes.node.isRequired, theme: PropTypes.string };
VanillaButton.defaultProps = { theme: '' };
export default VanillaButton;
