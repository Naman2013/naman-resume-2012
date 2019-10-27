import React from 'react';
import './index.scss';
import * as cx from 'classnames';
import { browserHistory } from 'react-router';

type TFeedItem = {
  item: any;
};

const contentClickHandler = (e: any) => {
  if (e.target instanceof HTMLAnchorElement) {
    const targetLink = e.target.closest('a');
    e.preventDefault();
    browserHistory.push(targetLink.href);
  }
};

export const FeedItem = (props: TFeedItem) => {
  const { item } = props;

  return (
    <div
      className={cx('feed-item', {
        'feed-item-current-user': item.currentUser,
      })}
    >
      <div className="feed-data">
	{props.item.date && <span className="feed-data-date">{props.item.date}</span>}
        {/* <span className="feed-data-user">{props.item.user}</span> */}
      </div>

      <div className="feed-msg">
        {item.currentUser ? (
          <div className="arrow-left" />
        ) : (
          <div className="arrow-right" />
        )}

        <span
          className="feed-msg-text"
          onClick={contentClickHandler}
          dangerouslySetInnerHTML={{ __html: item.text }}
          role="button"
        />
      </div>
    </div>
  );
};
