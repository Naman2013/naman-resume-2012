import React from 'react';
import './index.scss';

type TFeedItem = {
  member: Record<string, any>;
};

export const MemberItem = (props: TFeedItem) => {
  const {
    member: { displayName, gravityLabel, gravity, linkUrl },
  } = props;

  return (
    <div className="active-member-item">
      <a
        href={linkUrl}
        className="member-name"
        // target="_blank"
        rel="noopener noreferrer"
      >
        {displayName}
      </a>

      <div className="member-info">
        <div className="member-gravity-level">{gravityLabel}</div>
      </div>
    </div>
  );
};
