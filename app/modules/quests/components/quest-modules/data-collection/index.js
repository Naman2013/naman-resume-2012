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

  getDataCollectionImages = slotId => {
    const { module, questId, getDataCollectionImages } = this.props;
    const { moduleId } = module;
    getDataCollectionImages({ moduleId, questId, slotId });
  };

  showDataCollectionSlotModal = slotId => {
    this.getDataCollectionImages(slotId);
    this.setState({ dcSlotModalVisible: true, selectedSlot: slotId });
  };

  closeDataCollectionSlotModal = () => {
    this.setState({ dcSlotModalVisible: false });
  };

  render() {
    const {
      questDataCollection,
      getDataCollectionImagesSuccess,
      questId,
      module,
    } = this.props;
    const { modulePrompt, moduleInstructions, slotArray } = questDataCollection;
    const { moduleId } = module;
    const { dcSlotModalVisible, selectedSlot } = this.state;
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
            // getDataCollectionImagesSuccess={getDataCollectionImagesSuccess}
            // questId={questId}
            // moduleId={moduleId}
            // slotId={selectedSlot}
          />
        )}
      </div>
    );
  }
}
