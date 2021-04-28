// @flow
import React from 'react';
import QuestCustomer from 'app/modules/quests/containers/quest-customer';
import { ContainerWithTitle } from 'app/components/common/ContainerWithTitle';
import CenterColumn from 'app/components/common/CenterColumn';

type TProfileQuests = {};

export const ProfileQuests = (props: TProfileQuests) => {
  const { params } = props;
  
  const profileQuestTab = [
    {
      title: 'In progress',
      linkURL: params.route === 'myquests' ? `/quests/myquests/inprogress` : '/profile/private/quests/inprogress',
    },
    {
      title: 'Completed',
      linkURL: params.route === 'myquests' ? `/quests/myquests/completed` : '/profile/private/quests/completed',
    },
  ];

  return (
    <div className="profile-quest">
      <CenterColumn>
        <ContainerWithTitle
          title="My Quests"
          navItems={profileQuestTab}
          showNavigation
          activeFilter={params.viewType}
        >
          <QuestCustomer viewType={params.viewType} downloadQuest={props.onDownloadQuestReport}/>
        </ContainerWithTitle>
      </CenterColumn>
    </div>
  );
};
