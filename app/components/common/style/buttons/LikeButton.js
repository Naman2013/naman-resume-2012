import React from 'react';
import PropTypes from 'prop-types';
import ButtonWithIcon from './ButtonWithIcon';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const LikeButton = ({ count, onClickEvent }) => (
  <div>
    <ButtonWithIcon
      text={count}
      onClickEvent={onClickEvent}
      icon="https://vega.slooh.com/assets/v4/common/heart.svg"
    />
  </div>
);

LikeButton.propTypes = {
  count: oneOfType([string, number]).isRequired,
  onClickEvent: func.isRequired,
};
LikeButton.defaultProps = {};

export default LikeButton;
