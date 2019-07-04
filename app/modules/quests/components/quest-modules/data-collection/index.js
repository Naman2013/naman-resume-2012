import React, { PureComponent } from 'react';
import { QuestStepInfo } from '../../quest-step-info';
import { DataCollectionSlotCard } from './data-collection-slot-card';
import { DataCollectionSlotModal } from './data-collection-slot-modal';
import './styles.scss';

export class QuestModuleDataCollection extends PureComponent {
  state = {
    dcSlotModalVisible: false,
  };

  componentDidMount() {
    const { module, questId, getDataCollection } = this.props;
    const { moduleId } = module;

    if (questId && moduleId) getDataCollection(questId, moduleId);
  }

  showDataCollectionSlotModal = () => {
    this.setState({ dcSlotModalVisible: true });
  };

  closeDataCollectionSlotModal = () => {
    this.setState({ dcSlotModalVisible: false });
  };

  render() {
    const { questDataCollection } = this.props;
    const { modulePrompt, moduleInstructions, slotArray } = questDataCollection;
    const { dcSlotModalVisible } = this.state;
    console.log(questDataCollection);
    return (
      <div className="data-collection-module">
        <QuestStepInfo title={modulePrompt} description={moduleInstructions} />

        <div className="data-collection-slot-list">
          {slotArray?.map(slot => (
            <DataCollectionSlotCard
              key={slot.slotId}
              slot={slot}
              showDataCollectionSlotModal={this.showDataCollectionSlotModal}
            />
          ))}
        </div>

        {dcSlotModalVisible && (
          <DataCollectionSlotModal
            show
            onHide={this.closeDataCollectionSlotModal}
          />
        )}
      </div>
    );
  }
}
