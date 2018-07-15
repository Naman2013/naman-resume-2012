import React from 'react';
import PropTypes from 'prop-types';
import styles from './LargeButtonWithRightIcon.style';
const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const LargeButtonWithRightIcon = ({ text, onClickEvent, icon }) => (
  <button
    className="button-container"
    onClick={onClickEvent}
  >
    <span className="text" dangerouslySetInnerHTML={{ __html: text }} />
    <img
      className="icon"
      src={icon}
    />
    <style jsx>{styles}</style>
  </button>
);

LargeButtonWithRightIcon.propTypes = {
  icon: string.isRequired,
  text: oneOfType([string, number]).isRequired,
  onClickEvent: func.isRequired,
};
LargeButtonWithRightIcon.defaultProps = {};

export default LargeButtonWithRightIcon;
