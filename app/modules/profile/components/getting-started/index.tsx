import * as React from 'react';
import { Fragment } from 'react';
import CenterColumn from 'app/components/common/CenterColumn';
import { ContainerWithTitle } from 'app/components/common/ContainerWithTitle';
import QuestCard from 'app/components/common/tiles/Quest-card';
import { browserHistory } from 'react-router';
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

    return (
      <Fragment>
        {gettingStartedData && (
          <div className="getting-started-wrapper container">
            <CenterColumn>
              <ContainerWithTitle title={gettingStartedData.heading1}>
                <h3 className="my-5">{gettingStartedData.heading2}</h3>
                <div className="quest-list ">
                  {gettingStartedData.questsList.map(quest => (
                    <div className="quest-list-item">
                      <div>
                        {quest.sequenceDescription && (
                          <div
                            className="quest-help-text"
                            dangerouslySetInnerHTML={{
                              __html: quest.sequenceDescription,
                            }}
                          />
                        )}
                        <QuestCard
                          linkUrl={quest.LinkURL}
                          questType={quest.QuestType}
                          iconURL={quest.IconUrl}
                          questDifficulty={quest.Difficulty}
                          title={quest.QuestTitle}
                          linkLabel={quest.LinkLabel}
                        />
                        {quest.briefDescription && (
                          <div
                            className="quest-help-text"
                            dangerouslySetInnerHTML={{
                              __html: quest.briefDescription,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ContainerWithTitle>
            </CenterColumn>
          </div>
        )}
      </Fragment>
    );
  }
);
