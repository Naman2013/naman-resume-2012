import React, { KeyboardEvent } from 'react';
import './index.scss';
import * as cx from 'classnames';
import { browserHistory } from 'react-router';
import { isEnter } from 'app/modules/utils/keyIdentifier.tsx';

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

const onKeyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
  if (isEnter(e)) {
    contentClickHandler(e);
  }
};

export const FeedItem = (props: TFeedItem) => {
  const { item } = props;
  const { currentUser, text } = item;

  return (
    <div
      className={cx('feed-item', {
        'feed-item-current-user': currentUser,
      })}
    >
      <div className="feed-data">
        {props.item.date && (
          <span className="feed-data-date">{props.item.date}</span>
        )}
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
