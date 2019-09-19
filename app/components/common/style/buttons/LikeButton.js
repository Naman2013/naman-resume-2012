import PropTypes from 'prop-types';
import React from 'react';
import CountButton from './CountButton';

const { bool, func, number, oneOfType, string } = PropTypes;

const filledHeartIcon =
  'https://vega.slooh.com/assets/v4/common/heart-filled.svg';
const heartIcon = 'https://vega.slooh.com/assets/v4/common/heart.svg';

const LikeButton = ({
  count,
  onClickEvent,
  alwaysShowCount,
  mod,
  likedByMe,
}) => {
  return (
    <div className="like-button">
      <CountButton
        mod={mod}
        count={count}
        alwaysShowCount={alwaysShowCount}
        onClickEvent={onClickEvent}
        icon={likedByMe ? filledHeartIcon : heartIcon}
      />
      <style jsx>{`
        .like-button {
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

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
