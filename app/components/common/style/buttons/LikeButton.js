import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  const [liked, setLiked] = useState(likedByMe);
  return (
    <div>
      <CountButton
        mod={mod}
        count={count}
        alwaysShowCount={alwaysShowCount}
        onClickEvent={e => {
          onClickEvent(e);
          setLiked(true);
        }}
        icon={liked ? filledHeartIcon : heartIcon}
      />
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
