import React from 'react';
import {
  IQuestStepModule,
  ImageorderingModuleResponse,
  IQuestDataCollectionSlotImage,
  IQuestDataCollectionSlotImages,
  IQuestDataCollectionSlot,
} from 'app/modules/quests/types';
import './styles.scss';
import { QuestStepModuleHeader } from 'app/modules/quests/components/quest-step-module-header';
import {
  ACTIVITY_STATES,
  MODES,
} from 'app/modules/quests/constants/montageModule';
import { EditMode } from 'app/modules/quests/components/quest-modules/imageordering/edit-mode/edit';
import { FinishMode } from 'app/modules/quests/components/quest-modules/imageordering/finish-mode';
import { PreviewMode } from 'app/modules/quests/components/quest-modules/imageordering/preview-mode';

type TImageorderingProps = {
  module: IQuestStepModule;
  readOnly: boolean;
  routeParams: any;
  stepData: any;
  slot?: IQuestDataCollectionSlot;
  questId: string;
  navigateToNextStep: Function;
  getImageorderingModule: Function;
  setImageorderingModule: Function;
  setImageOrderingActivityState: Function;
  setDataCollectionSlotImages: Function;
  refreshQuestStep: Function;
  refreshModule: Function;
  getDataCollectionSlotImages: () => void;
  imageorderingModule: ImageorderingModuleResponse;
  image: IQuestDataCollectionSlotImage;
  loading?: boolean;
  questDataCollectionSlotImages?: IQuestDataCollectionSlotImages;
  user: User;
  activityStatus: ImageorderingModuleResponse['activityStatus'];
  mmSlotModalVisible: boolean;
};

type TImageorderingState = {
  showPreviewModal: boolean;
};

export class Imageordering extends React.PureComponent<
  TImageorderingProps,
  TImageorderingState
> {
  state = {
    showPreviewModal: false,
  };

  componentDidMount(): void {
    this.getImageOrderingModule();
  }

  showPreviewModal = (): void => this.setState({ showPreviewModal: true });

  hidePreviewModal = (): void => this.setState({ showPreviewModal: false });

  onChangeMode = (activityState: string): void => {
    const { setImageOrderingActivityState, imageorderingModule } = this.props;
    setImageOrderingActivityState({
      moduleId: imageorderingModule.moduleId,
      activityState,
    });
  };

  goToEditMode = (): void => {
    this.onChangeMode(MODES.EDIT);
    this.hidePreviewModal();
  };

  goToFinishMode = (): void => {
    this.onChangeMode(MODES.FINISHED);
    this.hidePreviewModal();
  };

  goToReviewMode = (): void => this.onChangeMode(MODES.REVIEW);

  getImageOrderingModule = (): void => {
    const { module, questId, stepData, getImageorderingModule } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;

    getImageorderingModule({
      questId,
      questUUID,
      moduleId,
      moduleUUID,
    });
  };

  setImageOrderingModule = (mode: string): Promise<any> => {
    const {
      module,
      questId,
      stepData,
      setImageorderingModule,
      refreshQuestStep,
    } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;

    return setImageorderingModule({
      questId,
      questUUID,
      moduleId,
      moduleUUID,
      button: mode,
    }).then(({ payload: { refreshStep, refreshModule } }: any): void => {
      if (refreshStep) {
        refreshQuestStep();
      } else if (refreshModule) {
        this.getImageOrderingModule();
      }
    });
  };

  setDataCollectionSlotImages = (
    image: IQuestDataCollectionSlotImage,
    selectedSlot: IQuestDataCollectionSlot,
    deleteSlotImage?: boolean
  ): void => {
    const {
      module,
      questId,
      setDataCollectionSlotImages,
      refreshQuestStep,
    } = this.props;
    const { moduleId } = module;
    const { customerImageId } = image;
    setDataCollectionSlotImages({
      moduleId,
      questId,
      customerImageId,
      slotId: selectedSlot.slotId,
      deleteSlotImage,
    }).then(({ payload }: any) => {
      if (payload.refreshStep) {
        refreshQuestStep();
      }
    });
  };

  removeDataCollectionSlotImage = (slotId: number, imageId: number): void => {
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
    }).then(({ payload }: any) => {
      if (payload.refreshStep) {
        refreshQuestStep();
      }
    });
  };

  render() {
    const { showPreviewModal } = this.state;
    const {
      imageorderingModule,
      getDataCollectionSlotImages,
      questDataCollectionSlotImages,
      user,
      loading,
    } = this.props;

    const {
      activityTitle,
      activityStatus,
      activityInstructions,
      activityState,
    } = imageorderingModule;

    return (
      <div className="montage-module quest-qa-free-form">
        <QuestStepModuleHeader
          title={activityTitle}
          completed={activityStatus === ACTIVITY_STATES.complete}
          instructions={activityInstructions}
        />

        {(activityState === MODES.EDIT ||
          activityState === MODES.PREVIEW ||
          activityState === MODES.REVIEW) && (
          <EditMode
            goToPreview={this.showPreviewModal}
            goToFinish={this.goToFinishMode}
            imageOrderingModule={imageorderingModule}
            getImageOrderingModule={this.getImageOrderingModule}
            setImageOrderingModule={this.setImageOrderingModule}
            getDataCollectionSlotImages={getDataCollectionSlotImages}
            questDataCollectionSlotImages={questDataCollectionSlotImages}
            setDataCollectionSlotImages={this.setDataCollectionSlotImages}
            removeDataCollectionSlotImage={this.removeDataCollectionSlotImage}
            user={user}
            loading={loading}
            activityState={activityState}
          />
        )}

        {(activityState === MODES.PREVIEW || showPreviewModal) && (
          <PreviewMode
            imageOrderingModule={imageorderingModule}
            setImageOrderingModule={this.setImageOrderingModule}
            goToEdit={this.goToEditMode}
            goToFinish={this.goToFinishMode}
          />
        )}

        {activityState === MODES.FINISHED && (
          <FinishMode
            imageOrderingModule={imageorderingModule}
            setImageOrderingModule={this.setImageOrderingModule}
            goToEdit={this.goToEditMode}
            goToReview={this.goToReviewMode}
          />
        )}
      </div>
    );
  }
}
