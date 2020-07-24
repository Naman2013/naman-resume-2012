import React from 'react';
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

  const myText = date + " - " + text;

  return (
    <div
      className="feed-item">

      <div className="feed-msg">
          <div className="arrow-left" />

        <span
          className="feed-msg-text"
          onClick={contentClickHandler}
          onKeyDown={onKeyPressed}
          dangerouslySetInnerHTML={{ __html: myText }}
          tabIndex={0}
          role="button"
        />
      </div>
    </div>
  );
};
