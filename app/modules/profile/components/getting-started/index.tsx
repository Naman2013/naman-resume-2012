import * as React from 'react';
import CenterColumn from 'app/components/common/CenterColumn';
import { ContainerWithTitle } from 'app/components/common/ContainerWithTitle';
import QuestCard from 'app/components/common/tiles/Quest-card';
// import { IGettingStarted } from 'app/modules/profile/types';

interface GettingStartedProps {
  data: {
    gettingStartedData: IGettingStarted;
  };
}

export const GettingStarted: React.FC<GettingStartedProps> = React.memo(
  (props: GettingStartedProps) => {
    console.log(props.data.gettingStartedData);

    const { data } = props;
    const { gettingStartedData } = data;
    const { heading1, heading2, questsList } = gettingStartedData;

    return (
      <div className="profile-quest">
        <CenterColumn>
          <ContainerWithTitle title={heading1}>
            <h3 className="my-5">{heading2}</h3>
            <div className="quest-list">
              {questsList.map(quest => (
                <div className="quest-list-item">
                  <QuestCard
                    linkUrl="/link"
                    questType={quest.briefDescription}
                    iconURL="https://vega.slooh.com/icons/badges/quests/Explorer.svg"
                    questDifficulty="level??"
                    title={quest.questTitle}
                    linkLabel="link label"
                  />
                </div>
              ))}
            </div>
          </ContainerWithTitle>
        </CenterColumn>
      </div>
    );
  }
);
