import React from 'react';
import './index.scss';
import * as cx from 'classnames';
import { browserHistory } from 'react-router';

type TFeedItem = {
  item: any;
};

const contentClickHandler = e => {
  if (e.target instanceof HTMLAnchorElement) {
    const targetLink = e.target.closest('a');
    e.preventDefault();
    browserHistory.push(targetLink.href);
  }
};

export const FeedItem = (props: TFeedItem) => (
  <div
    className={cx('feed-item', {
      'feed-item-current-user': props.item.currentUser,
    })}
  >
    <div className="feed-data">
      {/* <span className="feed-data-date">{props.item.date}</span> */}
      {/* <span className="feed-data-user">{props.item.user}</span> */}
    </div>

    <div className="feed-msg">
      {props.item.currentUser ? (
        <div className="arrow-left" />
      ) : (
        <div className="arrow-right" />
      )}

      <span
        onClick={contentClickHandler}
        dangerouslySetInnerHTML={{ __html: props.item.text }}
      />
    </div>
  </div>
);
