import React from 'react';
import {
  IQuestStepModule,
  ImageorderingModuleResponse,
} from 'app/modules/quests/types';
import './styles.scss';
import { QuestStepModuleHeader } from 'app/modules/quests/components/quest-step-module-header';
import { EditMode } from 'app/modules/quests/components/quest-modules/imageordering/edit-mode/edit';
import { FinishMode } from 'app/modules/quests/components/quest-modules/imageordering/finish';
import { PreviewMode } from 'app/modules/quests/components/quest-modules/imageordering/preview';

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
    const { module, questId, stepData, getImageorderingModule } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;

    getImageorderingModule({
      questId,
      questUUID,
      moduleId,
      moduleUUID,
    });
  }

  onChangeMode = (mode: Mode): void => this.setState({ mode });

  goToEditMode = (): void => this.onChangeMode(Mode.edit);

  goToPreviewMode = (): void => this.onChangeMode(Mode.preview);

  goToFinishMode = (): void => this.onChangeMode(Mode.finish);

  goToReviewMode = (): void => this.onChangeMode(Mode.review);

  setDataCollectionSlotImages = (image: any, selectedSlot: any): any => {
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
      loading,
    } = this.props;

    return (
      <div className="rich-text-module quest-qa-free-form">
        <QuestStepModuleHeader
          title="activityTitle"
          completed //activityState === ACTIVITY_STATES.complete
          sequenceText="activitySequenceText"
        />

        {mode === Mode.edit && (
          <EditMode
            goToPreview={this.goToPreviewMode}
            imageOrderingModule={imageorderingModule}
            getDataCollectionSlotImages={getDataCollectionSlotImages}
            questDataCollectionSlotImages={questDataCollectionSlotImages}
            setDataCollectionSlotImages={this.setDataCollectionSlotImages}
            loading={loading}
          />
        )}
        {mode === Mode.preview && (
          <PreviewMode
            goToEdit={this.goToEditMode}
            goToFinish={this.goToFinishMode}
          />
        )}
        {mode === Mode.finish && (
          <FinishMode goToReview={this.goToReviewMode} />
        )}
        {mode === Mode.review && (
          <EditMode
            readonly
            imageOrderingModule={imageorderingModule}
            getDataCollectionSlotImages={getDataCollectionSlotImages}
            questDataCollectionSlotImages={questDataCollectionSlotImages}
            setDataCollectionSlotImages={this.setDataCollectionSlotImages}
            loading={loading}
          />
        )}
      </div>
    );
  }
}
