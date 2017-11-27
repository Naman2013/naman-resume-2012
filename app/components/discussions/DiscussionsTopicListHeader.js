import React from 'react';
import PropTypes from 'prop-types';
import styles from './discussions-list.scss';

const { bool, string } = PropTypes;

function DiscussionsTopicListHeader({ threads, activeLink }) {
  return (
    <div className="header">
      <div className="clearfix">
        <div className="col-sm-5 col-xs-5 title">
          {activeLink
              .replace('-', ' ')
              .replace('alphabetic', 'alphabetical')
          }
        </div>
        <div className="col-sm-5 col-xs-5 title info">
          <span className="info-item">{threads ? 'Threads' : 'Voices'}</span>
          <span className="info-item">Replies</span>
          <span className="info-item">Freshness</span>
        </div>
      </div>
      <div className="col-sm-2 col-xs-2" />
      <style jsx>
      {`
        .header {
          padding: 0 0 10px 0;
        }
      `}
      </style>
    </div>
  );
}

DiscussionsTopicListHeader.defaultProps = {
  threads: false,
  activeLink: 'most-recent'
};

DiscussionsTopicListHeader.propTypes = {
  threads: bool,
  activeLink: string,
};

export default DiscussionsTopicListHeader;
