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

  removeDataCollectionSlotImage = (slotId, imageId) => {
    const {
      module,
      questId,
      setDataCollectionSlotImages,
      refreshQuestStep,
    } = this.props;
    const { moduleId } = module;
    setDataCollectionSlotImages({
      moduleId,
      questId,
      customerImageId: imageId,
      slotId,
      deleteSlotImage: '1',
    }).then(({ payload }) => {
      if (payload.refreshStep) {
        refreshQuestStep();
      }
    });
  };

  setDataCollectionSlotImages = image => {
    const {
      module,
      questId,
      setDataCollectionSlotImages,
      getDataCollection,
      getQuestStep,
      stepData,
      refreshQuestStep,
    } = this.props;
    const { moduleId } = module;
    const { customerImageId } = image;
    const { stepModuleId } = stepData;
    const { selectedSlot } = this.state;
    setDataCollectionSlotImages({
      moduleId,
      questId,
      customerImageId,
      slotId: selectedSlot.slotId,
    }).then(({ payload }) => {
      this.setState({ dcSlotModalVisible: false });
      if (payload.refreshStep) {
        refreshQuestStep();
      }
    });
  };

  showDataCollectionSlotModal = slot => {
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
      setDataCollectionSlotImages,
      getDataCollectionSlotImages,
      navigateToNextStep,
      readOnly,
      loading,
      user,
    } = this.props;
    const { modulePrompt, moduleInstructions, slotArray } = questDataCollection;
    const { moduleId } = module;
    const { dcSlotModalVisible, selectedSlot } = this.state;

    return (
      <div className="data-collection-module">
        <QuestStepInfo
          title={modulePrompt}
          description={moduleInstructions}
          navigateToNextStep={navigateToNextStep}
        />

        <div className="data-collection-slot-list">
          {slotArray?.map(slot => (
            <DataCollectionSlotCard
              key={slot.slotId}
              slot={slot}
              showDataCollectionSlotModal={this.showDataCollectionSlotModal}
              removeDataCollectionSlotImage={this.removeDataCollectionSlotImage}
              user={user}
              readOnly={readOnly}
            />
          ))}
        </div>

        {dcSlotModalVisible && (
          <DataCollectionSlotModal
            show
            onHide={this.closeDataCollectionSlotModal}
            questDataCollectionSlotImages={questDataCollectionSlotImages}
            selectedSlot={selectedSlot}
            getDataCollectionSlotImages={getDataCollectionSlotImages}
            setDataCollectionSlotImages={this.setDataCollectionSlotImages}
            moduleId={moduleId}
            questId={questId}
            loading={loading}
          />
        )}
      </div>
    );
  }
}
