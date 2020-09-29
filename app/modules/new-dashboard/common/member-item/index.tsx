import React from 'react';
import './index.scss';

type TFeedItem = {
  member: Record<string, any>;
  contentClickHandler: (e: any) => void;
  onKeyPressed: (e: any) => void;
  onClickItem: Function;
};

export const MemberItem = (props: TFeedItem) => {
  const {
    member: { displayName, gravityLabel, gravity, linkUrl, customerUUID }, contentClickHandler, onKeyPressed, onClickItem
  } = props;
  
  return (
    <div className="active-member-item">
      <span
        onKeyDown={onKeyPressed}
        onClick={contentClickHandler}     
        tabIndex={0}
        role="button"       
        className="member-name"       
      >
        <a          
          onClick={()=>onClickItem(customerUUID, true)}
          // href={linkUrl}
          href=""
          >
          {displayName}
        </a>
      </span>

      <div className="member-info">
        <div className="member-gravity-level">{gravityLabel}</div>
      </div>
    </div>
  );
};
