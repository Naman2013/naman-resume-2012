import React from 'react';
import './index.scss';

type TFeedItem = {
  member: Record<string, any>;
};

export const MemberItem = (props: TFeedItem) => {
  const {
    member: { displayName, gravityLabel, gravity },
  } = props;

  return (
    <div className="active-member-item">
      <div className="member-name">{displayName}</div>

      <div className="member-info">
        <div className="member-gravity-level">{gravityLabel}</div>

        <div className="member-gravity">{gravity}</div>
      </div>
    </div>
  );
};
