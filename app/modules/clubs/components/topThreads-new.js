import React, { useEffect, memo, useState } from 'react';
import { Link } from 'react-router';
import {
  setupTopThreadsExpireTimer,
  stopTopThreadsExpireTimer,
} from 'app/services/community-groups/timer';
import BlueLineDrop from '../../../components/common/BlueLineDrop';

import './topThreads.scss';
import { browserHistory } from 'react-router';
import { ClubTabHeader } from 'app/modules/new-dashboard/components/tab-header-for-clubs';


 export const TopThreadsNew = memo(function TopThreads(props) {

  const { topThreadsList, isDesktop, discussionGroupId, setPublicCardStatusAction } = props;

  const [currentTab, setCurrentTab] = useState(topThreadsList?.tabDefault);

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
          topThreadsOnly: true,
          viewType: currentTab,
        })
        .then(({ expires, tabDefault }) => {
          setCurrentTab(tabDefault);
          setupTopThreadsExpireTimer(expires, () =>               
              setShouldReload(!shouldReload)                      
          );
        });
    }
  }, [props.topicId, shouldReload]);

  const onTabChange = (viewType) =>{
      setCurrentTab(viewType, setShouldReload(!shouldReload));    
        
  }

  //eslint-disable-line react-hooks/exhaustive-deps

  
  

  return (
    <div className="top-discussions-wr">
      <BlueLineDrop
        title={`Popular Discussions (${topThreadsList?.threads?.length ? topThreadsList?.threads?.length : 0 })`}
        isDesktop={isDesktop}
        isDefaultOpen
        render={() => (
          topThreadsList && (
          <div className="members-list">
            <div className="new-dash">
              
              <ClubTabHeader
                headings={topThreadsList?.tabOptions}
                activeHeading={currentTab}
                spaceequally={true}
                theme={"light"}
                onTabChange={onTabChange}
              />
            </div>
            {topThreadsList?.threads?.map(x => (
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
                      <img className="avatar" src={x.avatarURL} alt="avatar" />
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
        ))}
      />
    </div>
  );
});
