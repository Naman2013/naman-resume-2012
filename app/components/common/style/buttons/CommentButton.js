import React from 'react';
import PropTypes from 'prop-types';
import CountButton from './CountButton';
import { commentWhite, commentAstronaut } from 'styles/variables/iconURLs';

const {
  func,
  number,
  oneOfType,
  string,
bool
} = PropTypes;

const CommentButton = ({ count, isActive, onClickEvent, alwaysShowCount }) => (
  <div>
    <CountButton
      isActive={isActive}
      count={count}
      onClickEvent={onClickEvent}
      icon={isActive ? commentWhite : commentAstronaut}
      alwaysShowCount = {alwaysShowCount}
    />
  </div>
);

CommentButton.propTypes = {
  count: oneOfType([string, number]).isRequired,
  onClickEvent: func.isRequired,
  alwaysShowCount:bool
};
CommentButton.defaultProps = {
  alwaysShowCount:false
};

export default CommentButton;
