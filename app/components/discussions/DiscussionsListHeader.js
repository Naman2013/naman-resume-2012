import React, { PropTypes } from 'react';
import styles from './discussions-list.scss';

const { bool, string } = PropTypes;

function DiscussionsListHeader({ threads, activeLink }) {
  return (
    <div className="header">
      <div className="row">
        <div className="col-md-7 title">
          {activeLink
              .replace('-', ' ')
              .replace('alphabetic', 'alphabetical')
          }
        </div>
        <div className="col-md-5 title info">
          <span className="info-item">{threads ? 'Threads' : 'Voices'}</span>
          <span className="info-item">Replies</span>
          <span className="info-item">Freshness</span>
        </div>
      </div>
    </div>
  );
}

DiscussionsListHeader.defaultProps = {
  threads: false,
  activeLink: 'most-recent'
};

DiscussionsListHeader.propTypes = {
  threads: bool,
  activeLink: string,
};

export default DiscussionsListHeader;
