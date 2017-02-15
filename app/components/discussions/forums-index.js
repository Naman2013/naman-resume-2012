import React, { Component } from 'react';
import styles from './forums-index.scss';

const forums = [
  {
    topic: 'Images',
    threads: 20,
  },
  {
    topic: 'Science',
    threads: 20,
  },
  {
    topic: 'Artistic',
    threads: 20,
  },
  {
    topic: 'Spiritual',
    threads: 20,
  },
  {
    topic: 'Technical',
    threads: 20,
  },
];

class ForumsIndex extends Component {
  render() {
    return (
      <div className="forums-index-wrapper">
        <div className="forums-index-header">
          Forums Index
          <span className="description">Conversations across the Slooh Community</span>
        </div>
        <div className="forums-index-sub-header">
          <div className="cell">Topics</div>
          <div className="cell">Threads</div>
        </div>
        <ul className="forums-index-list">
          {forums.map((forum) => {
            return (
              <li>
                <a className="forums-link">
                  <span className="cell topic">{forum.topic}</span>
                  <span className="cell threads">{forum.threads}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ForumsIndex;
