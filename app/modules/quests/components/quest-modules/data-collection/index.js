import React, { PureComponent } from 'react';
import { QuestStepInfo } from '../../quest-step-info';
import { DataCollectionSlotCard } from './data-collection-slot-card';
import './styles.scss';

export class QuestModuleDataCollection extends PureComponent {
  componentDidMount() {
    const { module, questId, getDataCollection } = this.props;
    const { moduleId } = module;

    if (questId && moduleId) getDataCollection(questId, moduleId);
  }

  render() {
    const { questDataCollection } = this.props;
    const { modulePrompt, moduleInstructions, slotArray } = questDataCollection;
    console.log(questDataCollection);
    return (
      <div className="data-collection-module">
        <QuestStepInfo title={modulePrompt} description={moduleInstructions} />

        <div className="data-collection-slot-list">
          {slotArray?.map(slot => (
            <DataCollectionSlotCard key={slot.slotId} slot={slot} />
          ))}
        </div>
      </div>
    );
  }
}
