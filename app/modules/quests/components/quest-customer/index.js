import React, { PureComponent } from 'react';
import './styles.scss';
import QuestCard from 'app/components/common/tiles/Quest-card';
import { findLastIndex } from 'lodash';

export class QuestCustomer extends PureComponent {
  componentDidMount() {
    const { getCustomerQuests, viewType, } = this.props;
    
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
      <div>
        <div className="quest-list">
          {QuestList
            ? QuestList.map(item => (
                <div className="quest-list-item questButtonStyle">
                  <QuestCard
                    linkUrl={item.LinkURL}
                    questType={item.QuestType}
                    iconURL={item.IconUrl}
                    questDifficulty={item.Difficulty}
                    title={item.QuestTitle}
                    linkLabel={item.LinkLabel}
                    onDownloadPdf={this.props.downloadQuest}
                    questId={item.QuestId}
                    key={item.QuestId}
                  />
                </div>
              ))
            : null}
        </div>
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
