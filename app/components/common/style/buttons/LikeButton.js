import React from 'react';
import PropTypes from 'prop-types';
import CountButton from './CountButton';

const { bool, func, number, oneOfType, string } = PropTypes;

const LikeButton = ({ count, onClickEvent, alwaysShowCount, mod }) => (
  <div>
    <CountButton
      mod={mod}
      count={count}
      alwaysShowCount={alwaysShowCount}
      onClickEvent={onClickEvent}
      icon="https://vega.slooh.com/assets/v4/common/heart.svg"
    />
  </div>
);

LikeButton.propTypes = {
  alwaysShowCount: bool,
  count: oneOfType([string, number]),
  onClickEvent: func.isRequired,
  mod: string,
};
LikeButton.defaultProps = {
  alwaysShowCount: false,
};

export default LikeButton;
