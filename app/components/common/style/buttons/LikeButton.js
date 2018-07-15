import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import CountButton from './CountButton';
import { DeviceContext } from 'providers/DeviceProvider';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const LikeButton = ({ count, onClickEvent }) => (<div>
  <CountButton
    count={count}
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
