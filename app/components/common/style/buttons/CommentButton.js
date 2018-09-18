import React from 'react';
import PropTypes from 'prop-types';
import CountButton from './CountButton';
import { commentWhite, commentAstronaut } from 'styles/variables/iconURLs';

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
      icon={isActive ? commentWhite : commentAstronaut}
    />
  </div>
);

CommentButton.propTypes = {
  count: oneOfType([string, number]).isRequired,
  onClickEvent: func.isRequired,
};
CommentButton.defaultProps = {};

export default CommentButton;
