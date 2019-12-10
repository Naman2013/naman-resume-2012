import React, { KeyboardEvent } from 'react';
import './index.scss';
import * as cx from 'classnames';

type TFeedItem = {
  item: any;
  contentClickHandler: (e: any) => void;
  onKeyPressed: (e: any) => void;
};

export const FeedItem = (props: TFeedItem) => {
  const { item, contentClickHandler, onKeyPressed } = props;
  const { currentUser, text, date } = item;

  return (
    <div
      className={cx('feed-item', {
        'feed-item-current-user': currentUser,
      })}
    >
      <div className="feed-data">
        {date && <span className="feed-data-date">{date}</span>}
        {/* <span className="feed-data-user">{props.item.user}</span> */}
      </div>

      <div className="feed-msg">
        {currentUser ? (
          <div className="arrow-left" />
        ) : (
          <div className="arrow-right" />
        )}

        <span
          className="feed-msg-text"
          onClick={contentClickHandler}
          onKeyDown={onKeyPressed}
          dangerouslySetInnerHTML={{ __html: text }}
          tabIndex={0}
          role="button"
        />
      </div>
    </div>
  );
};
