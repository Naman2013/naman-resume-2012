import React from 'react';
import styles from './discussions-list.scss';

function DiscussionsListHeader() {
  return (
    <div className="header">
      <div className="row">
        <div className="col-md-7 title">Latest activity</div>
        <div className="col-md-5 title info">
          <span className="info-item">Voices</span>
          <span className="info-item">Replies</span>
          <span className="info-item">Freshness</span>
        </div>
      </div>
    </div>
  );
}

export default DiscussionsListHeader;
