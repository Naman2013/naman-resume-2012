import * as React from 'react';
import './index.scss';
import * as cx from 'classnames';

type TFeedItem = {
  item: any;
};

export const FeedItem = (props: TFeedItem) => (
  <div
    className={cx('feed-item', {
      'feed-item-current-user': props.item.currentUser,
    })}
  >
    <div className="feed-data">
      <span className="feed-data-date">{props.item.date}</span>
      <span className="feed-data-user">{props.item.user}</span>
    </div>

    <div className="feed-msg">
      {props.item.currentUser ? (
        <div className="arrow-right" />
      ) : (
        <div className="arrow-left" />
      )}

      {props.item.text}
    </div>
  </div>
);
