import React from 'react';
import PropTypes from 'prop-types';
import { commentWhite, commentAstronaut } from 'app/styles/variables/iconURLs';
import cx from 'classnames';
import CountButton from './CountButton';

const { func, number, oneOfType, string, bool } = PropTypes;

const CommentButton = ({
  count,
  isActive,
  onClickEvent,
  alwaysShowCount,
  isDisabled,
}) => (
  <div className={cx({ 'comment-btn-disabled': isDisabled })}>
    <CountButton
      isActive={isActive}
      count={count}
      onClickEvent={onClickEvent}
      icon={isActive ? commentWhite : commentAstronaut}
      alwaysShowCount={alwaysShowCount}
    />
    <style jsx>{`
      .comment-btn-disabled {
        pointer-events: none;
      }
    `}</style>
  </div>
);

CommentButton.propTypes = {
  count: oneOfType([string, number]).isRequired,
  onClickEvent: func.isRequired,
  alwaysShowCount: bool,
  isDisabled: string,
};
CommentButton.defaultProps = {
  alwaysShowCount: false,
};

export default CommentButton;
