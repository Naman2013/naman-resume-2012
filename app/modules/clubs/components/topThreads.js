import React, { useEffect, memo, useState } from 'react';
import { Link } from 'react-router';
import {
  setupTopThreadsExpireTimer,
  stopTopThreadsExpireTimer,
} from 'app/services/community-groups/timer';
import BlueLineDrop from '../../../components/common/BlueLineDrop';

import './topThreads.scss';
import { browserHistory } from 'react-router';

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

  const { topThreadsList, isDesktop, discussionGroupId, setPublicCardStatusAction } = props;
  
  return (
    <div className="top-discussions-wr">
      <BlueLineDrop
        title={`Popular Discussions (${topThreadsList?.length})`}
        isDesktop={isDesktop}
        isDefaultOpen
        render={() => (
          <div className="members-list">
            {topThreadsList?.map(x => (
              <div                
                className="navigation-link"               
              >
                <div className="members-list-card">                                  
                    <div
                      onClick={()=>browserHistory.push(`/community-groups/${discussionGroupId}/discussions/${x.threadId}`)}
                      className="header __html-blob-content-container__"
                      dangerouslySetInnerHTML={{
                        __html: x.title,
                      }}
                    />                                   
                  <div className="bottom">
                    <span className="user-info">
                      <img className="avatar" src={x.avatarUrl} alt="avatar" />
                      {/* <Link to={x?.authorInfo?.linkUrl}> */}
                        <div className="profile-name" onClick={()=>setPublicCardStatusAction(x.authorInfo.customerUUID, true)}>
                        {x.displayName}
                        </div>
                        {/* </Link> */}
                    </span>
                    <div className="date-container">{x.totalLikes} likes</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
});
