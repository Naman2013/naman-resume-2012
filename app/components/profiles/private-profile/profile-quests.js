// @flow
import React from 'react';
import QuestCustomer from 'app/modules/quests/containers/quest-customer';
import { ContainerWithTitle } from 'app/components/common/ContainerWithTitle';
import CenterColumn from 'app/components/common/CenterColumn';

type TProfileQuests = {};

export const ProfileQuests = (props: TProfileQuests) => {
  const { params } = props;

  const getPrivateNavItems = () => [
    {
      title: 'In progress',
      linkURL: '/profile/private/quests/inprogress',
    },
    {
      title: 'Completed',
      linkURL: '/profile/private/quests/completed',
    },
  ];

  return (
    <div className="profile-quest">
      <CenterColumn>
        <ContainerWithTitle
          title="My Quets"
          navItems={getPrivateNavItems()}
          showNavigation
          activeFilter={params.viewType}
        >
          <QuestCustomer viewType={params.viewType} />
        </ContainerWithTitle>
      </CenterColumn>
    </div>
  );
};
