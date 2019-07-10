import React, { PureComponent } from 'react';
import { QuestStepInfo } from '../../quest-step-info';
import { DataCollectionSlotCard } from './data-collection-slot-card';
import { DataCollectionSlotModal } from './data-collection-slot-modal';
import './styles.scss';

export class QuestModuleDataCollection extends PureComponent {
  state = {
    dcSlotModalVisible: false,
    selectedSlot: null,
  };

  componentDidMount() {
    const { module, questId, getDataCollection } = this.props;
    const { moduleId } = module;

    if (questId && moduleId) getDataCollection(questId, moduleId);
  }

  getDataCollectionSlotImages = slot => {
    const { module, questId, getDataCollectionSlotImages } = this.props;
    const { moduleId } = module;
    const { slotId } = slot;
    getDataCollectionSlotImages({ moduleId, questId, slotId });
  };

  showDataCollectionSlotModal = slot => {
    this.getDataCollectionSlotImages(slot);
    this.setState({ dcSlotModalVisible: true, selectedSlot: slot });
  };

  closeDataCollectionSlotModal = () => {
    this.setState({ dcSlotModalVisible: false });
  };

  render() {
    const {
      questDataCollection,
      questId,
      module,
      questDataCollectionSlotImages,
    } = this.props;
    const { modulePrompt, moduleInstructions, slotArray } = questDataCollection;
    const { moduleId } = module;
    const { dcSlotModalVisible, selectedSlot } = this.state;
    console.log(questDataCollectionSlotImages);
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
            questDataCollectionSlotImages={questDataCollectionSlotImages}
            selectedSlot={selectedSlot}
          />
        )}
      </div>
    );
  }
}
