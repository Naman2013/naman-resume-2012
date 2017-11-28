import React from 'react';
import PropTypes from 'prop-types';
import styles from './discussions-list.scss';

const { bool, string } = PropTypes;

function DiscussionsListHeader({ threads, activeLink }) {
  return (
    <div className="header">
      <div className="clearfix">
        <div className="col-sm-7 col-xs-6 title">
          {activeLink === 'followed-topics' ? 'Topics I Follow' : activeLink
              .replace('-', ' ')
              .replace('alphabetic', 'alphabetical')
          }
        </div>
        <div className="col-sm-5 col-xs-6 title info">
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
