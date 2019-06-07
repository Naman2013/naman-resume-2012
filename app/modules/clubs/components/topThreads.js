import React, { useEffect, memo, useState } from 'react';
import {
  setupTopThreadsExpireTimer,
  stopTopThreadsExpireTimer,
} from 'app/services/community-groups/timer';
import BlueLineDrop from '../../../components/common/BlueLineDrop';

import './topThreads.scss';

export const TopThreads = memo(function TopThreads(props) {
  const [shouldReload, setShouldReload] = useState(false);
  useEffect(() => {
    if (props.topicId !== undefined) {
      stopTopThreadsExpireTimer();
      props
        .getTopThreadList({
          count: 10,
          page: 1,
          callSource: 'groups',
          topicId: props.topicId,
        })
        .then(({ expires }) => {
          setupTopThreadsExpireTimer(expires, () =>
            setShouldReload(!shouldReload)
          );
        });
    }
  }, [props.topicId, shouldReload]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="top-discussions-wr">
      <BlueLineDrop
        title={`Popular Discussions (${props.topThreadsList.length})`}
        isDesktop={props.isDesktop}
        isDefaultOpen
        render={() => (
          <div className="members-list">
            {props.topThreadsList.map(x => (
              <a href={`#card-${x.threadId}`} className="navigation-link">
                <div className="members-list-card">
                  <div
                    className="header __html-blob-content-container__"
                    dangerouslySetInnerHTML={{
                      __html: x.title,
                    }}
                  />
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
