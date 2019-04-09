import React, { useEffect, memo } from 'react';
import BlueLineDrop from '../../../components/common/BlueLineDrop';

import './topThreads.scss';

export const TopThreads = memo(function TopThreads(props) {
  useEffect(() => {
    props.getTopThreadList({
      count: 10,
      page: 1,
      callSource: 'groups',
      topicId: props.topicId,
    });
  }, [props.topicId]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="top-discussions-wr">
      <BlueLineDrop
        title="Top Discussions"
        isDesktop={props.isDesktop}
        render={() => (
          <div className="members-list">
            {props.topThreadsList.map(x => (
              <a href={`#card-${x.threadId}`} className="navigation-link">
                <div className="members-list-card">
                  <div className="header">{x.title}</div>
                  <div className="bottom">
                    <span className="user-info">
                      <img className="avatar" src={x.avatarUrl} />
                      {x.displayName}
                    </span>
                    <div className="date-container">{x.freshness}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      />
    </div>
  );
});
