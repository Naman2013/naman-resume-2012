import React from 'react';
import {
  IQuestStepModule,
  ImageorderingModuleResponse,
} from 'app/modules/quests/types.ts';
import './styles.scss';
import { QuestStepModuleHeader } from 'app/modules/quests/components/quest-step-module-header';
import { EditMode } from 'app/modules/quests/components/quest-modules/imageordering/edit-mode/edit';
import { FinishMode } from 'app/modules/quests/components/quest-modules/imageordering/finish-mode';
import { PreviewMode } from 'app/modules/quests/components/quest-modules/imageordering/preview-mode';

type ImageorderingProps = {
  module: IQuestStepModule;
  readOnly: boolean;
  routeParams: any;
  stepData: any;
  slot?: object;
  questId: string;
  navigateToNextStep: Function;
  getImageorderingModule: Function;
  setImageorderingModule: Function;
  setDataCollectionSlotImages: Function;
  refreshQuestStep: Function;
  getDataCollectionSlotImages: () => void;
  imageorderingModule: ImageorderingModuleResponse;
  image: any;
  loading?: boolean;
  questDataCollectionSlotImages?: object;
  user: User;
};

enum Mode {
  edit,
  preview,
  finish,
  review,
}

type ImageorderingState = {
  mode: Mode;
};

export class Imageordering extends React.PureComponent<
  ImageorderingProps,
  ImageorderingState
> {
  state = {
    mode: Mode.edit,
  };

  componentDidMount(): void {
    this.getImageOrderingModule();
  }

  onChangeMode = (mode: Mode): void => this.setState({ mode });

  goToEditMode = (): void => this.onChangeMode(Mode.edit);

  goToPreviewMode = (): void => this.onChangeMode(Mode.preview);

  goToFinishMode = (): void => this.onChangeMode(Mode.finish);

  goToReviewMode = (): void => this.onChangeMode(Mode.review);

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

  setDataCollectionSlotImages = (
    image: any,
    selectedSlot: any,
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
    const { mode } = this.state;
    const {
      module,
      readOnly,
      imageorderingModule,
      getDataCollectionSlotImages,
      questDataCollectionSlotImages,
      user,
      loading,
    } = this.props;

    return (
      <div className="montage-module quest-qa-free-form">
        <QuestStepModuleHeader
          title="activityTitle"
          completed //activityState === ACTIVITY_STATES.complete
          sequenceText="activitySequenceText"
        />

        {mode === Mode.edit && (
          <EditMode
            goToPreview={this.goToPreviewMode}
            imageOrderingModule={imageorderingModule}
            getImageOrderingModule={this.getImageOrderingModule}
            getDataCollectionSlotImages={getDataCollectionSlotImages}
            questDataCollectionSlotImages={questDataCollectionSlotImages}
            setDataCollectionSlotImages={this.setDataCollectionSlotImages}
            removeDataCollectionSlotImage={this.removeDataCollectionSlotImage}
            user={user}
            loading={loading}
          />
        )}
        {mode === Mode.preview && (
          <PreviewMode
            imageOrderingModule={imageorderingModule}
            completed
            goToEdit={this.goToEditMode}
            goToFinish={this.goToFinishMode}
          />
        )}
        {mode === Mode.finish && (
          <FinishMode
            imageOrderingModule={imageorderingModule}
            goToReview={this.goToReviewMode}
          />
        )}
        {mode === Mode.review && (
          <EditMode
            readonly
            imageOrderingModule={imageorderingModule}
            getImageOrderingModule={this.getImageOrderingModule}
            getDataCollectionSlotImages={getDataCollectionSlotImages}
            questDataCollectionSlotImages={questDataCollectionSlotImages}
            setDataCollectionSlotImages={this.setDataCollectionSlotImages}
            removeDataCollectionSlotImage={this.removeDataCollectionSlotImage}
            user={user}
            loading={loading}
          />
        )}
      </div>
    );
  }
}
