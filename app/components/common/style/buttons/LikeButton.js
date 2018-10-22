import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import CountButton from './CountButton';
import { DeviceContext } from 'providers/DeviceProvider';

const {
  bool,
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const LikeButton = ({ count, onClickEvent, alwaysShowCount }) => (<div>
  <CountButton
    alwaysShowCount={alwaysShowCount}
    count={count}
    onClickEvent={onClickEvent}
    icon="https://vega.slooh.com/assets/v4/common/heart.svg"
  />
</div>
);

LikeButton.propTypes = {
  alwaysShowCount: bool,
  count: oneOfType([string, number]),
  onClickEvent: func.isRequired,
};
LikeButton.defaultProps = {
  alwaysShowCount: false,
};

export default LikeButton;
