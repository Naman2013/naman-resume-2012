import React from 'react';
import PropTypes from 'prop-types';
import SmallButtonWithIcon from './SmallButtonWithIcon';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const CommentButton = ({ count, onClickEvent }) => (
  <div>
    <SmallButtonWithIcon
      text={count}
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
