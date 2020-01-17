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
  MODE,
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
  setDataCollectionSlotImages: Function;
  refreshQuestStep: Function;
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
  mode: MODE;
};

export class Imageordering extends React.PureComponent<
  TImageorderingProps,
  TImageorderingState
> {
  state = {
    mode: MODE.edit,
  };

  componentDidMount(): void {
    this.getImageOrderingModule();
  }

  onChangeMode = (mode: MODE): void => this.setState({ mode });

  goToEditMode = (): void => this.onChangeMode(MODE.edit);

  goToPreviewMode = (): void => this.onChangeMode(MODE.preview);

  goToFinishMode = (): void => this.onChangeMode(MODE.finish);

  goToReviewMode = (): void => this.onChangeMode(MODE.review);

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
    const { module, questId, stepData, setImageorderingModule } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;

    return setImageorderingModule({
      questId,
      questUUID,
      moduleId,
      moduleUUID,
      button: mode,
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

        {(mode === MODE.edit || mode === MODE.review) &&
          activityState !== MODES.FINISHED && (
            <EditMode
              goToPreview={this.goToPreviewMode}
              imageOrderingModule={imageorderingModule}
              getImageOrderingModule={this.getImageOrderingModule}
              setImageOrderingModule={this.setImageOrderingModule}
              getDataCollectionSlotImages={getDataCollectionSlotImages}
              questDataCollectionSlotImages={questDataCollectionSlotImages}
              setDataCollectionSlotImages={this.setDataCollectionSlotImages}
              removeDataCollectionSlotImage={this.removeDataCollectionSlotImage}
              user={user}
              loading={loading}
              readOnly={readOnly}
              mode={mode}
            />
          )}

        {mode === MODE.preview && (
          <PreviewMode
            imageOrderingModule={imageorderingModule}
            setImageOrderingModule={this.setImageOrderingModule}
            goToEdit={this.goToEditMode}
            goToFinish={this.goToFinishMode}
          />
        )}

        {(mode === MODE.finish || activityState === MODES.FINISHED) && (
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
