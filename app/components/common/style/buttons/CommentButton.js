import React from 'react';
import PropTypes from 'prop-types';
import CountButton from './CountButton';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const CommentButton = ({ count, isActive, onClickEvent }) => (
  <div>
    <CountButton
      isActive={isActive}
      count={count}
      onClickEvent={onClickEvent}
      icon="https://vega.slooh.com/assets/v4/common/comment.svg"
    />
  </div>
);

CommentButton.propTypes = {
  count: oneOfType([string, number]).isRequired,
  onClickEvent: func.isRequired,
};
CommentButton.defaultProps = {};

export default CommentButton;
