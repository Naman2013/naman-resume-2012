import React from 'react';
import './index.scss';

type TFeedItem = {
  member: string;
};

export const MemberItem = (props: TFeedItem) => {
  const { member } = props;

  return (
    <div className="active-member-item">
      <div className="member-name">{member}</div>

      <div className="member-info">
        <div className="member-gravity-level">Level: Azophi</div>

        <div className="member-gravity">676</div>
      </div>
    </div>
  );
};
