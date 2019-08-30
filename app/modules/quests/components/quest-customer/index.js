import React, { PureComponent } from 'react';
import './styles.scss';
import QuestCard from 'app/components/common/tiles/Quest-card';

export class QuestCustomer extends PureComponent {

  componentDidMount() {
    const { getCustomerQuests, viewType } = this.props;
    getCustomerQuests({ viewType });
  }

  componentDidUpdate(prevProps) {
    const { getCustomerQuests, viewType } = this.props;
    if (viewType !== prevProps.viewType) {
      getCustomerQuests({ viewType });
    }
  }

  render() {
    const { customerQuestsData } = this.props;
    const { QuestList, emptySetDisplay } = customerQuestsData;

    return (
      <div className="quest-list">
        {QuestList
          ? QuestList.map(item => (
              <div className="quest-list-item">
                <QuestCard
                  linkUrl={item.LinkURL}
                  questType={item.QuestType}
                  iconURL={item.IconUrl}
                  questDifficulty={item.Difficulty}
                  title={item.QuestTitle}
                />
              </div>
            ))
          : null}
        {emptySetDisplay ? (
          <div
            className="quest-list-empty"
            dangerouslySetInnerHTML={{ __html: emptySetDisplay }}
          />
        ) : null}
      </div>
    );
  }
}
