import React from 'react';
import PropTypes from 'prop-types';
import styles from './BackBar.style';

const {
  func,
} = PropTypes;

const BackBar = ({
  onClickEvent,
}) => (
  <button
    onClick={onClickEvent}
    className="top-bar"
  >
    <i className="fa fa-arrow-left" />
    <span className="back">BACK</span>
    <style jsx>{styles}</style>
  </button>
);

BackBar.propTypes = {
  onClickEvent: func.isRequired,
};
BackBar.defaultProps = {};

export default BackBar;
