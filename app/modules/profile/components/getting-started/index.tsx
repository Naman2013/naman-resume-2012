import * as React from 'react';
import CenterColumn from 'app/components/common/CenterColumn';
import { ContainerWithTitle } from 'app/components/common/ContainerWithTitle';
import QuestCard from 'app/components/common/tiles/Quest-card';
import './index.scss';

interface GettingStartedProps {
  data: {
    gettingStartedData: IGettingStarted;
  };
}

export const GettingStarted: React.FC<GettingStartedProps> = React.memo(
  (props: GettingStartedProps) => {
    const { data } = props;
    const { gettingStartedData } = data;
    const { heading1, heading2, questsList } = gettingStartedData;

    return (
      <div className="getting-started-wrapper container">
        <CenterColumn>
          <ContainerWithTitle title={heading1}>
            <h3 className="my-5">{heading2}</h3>
            <div className="quest-list ">
              {questsList.map(quest => (
                <div className="quest-list-item">
                  <div>
                    <div
                      className="quest-help-text"
                      dangerouslySetInnerHTML={{
                        __html: quest.sequenceDescription,
                      }}
                    />
                    <QuestCard
                      linkUrl={quest.LinkURL}
                      questType={quest.QuestType}
                      iconURL={quest.IconUrl}
                      questDifficulty={quest.Difficulty}
                      title={quest.QuestTitle}
                      linkLabel={quest.LinkLabel}
                    />
                    <div
                      className="quest-help-text"
                      dangerouslySetInnerHTML={{
                        __html: quest.briefDescription,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ContainerWithTitle>
        </CenterColumn>
      </div>
    );
  }
);
