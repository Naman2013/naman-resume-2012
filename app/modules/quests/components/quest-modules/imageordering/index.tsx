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
  handleBacktoQuest: Function;
};

export class Imageordering extends React.PureComponent<TImageorderingProps> {
  moduleRef = React.createRef<HTMLDivElement>();

  componentDidMount(): void {
    this.getImageOrderingModule();
  }

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

  setImageOrderingModule = (
    activityState: string,
    scrollIntoView = false
  ): void => {
    const {
      module,
      imageorderingModule,
      questId,
      stepData,
      setImageorderingModule,
      setImageOrderingActivityState,
      refreshQuestStep,
    } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;

    if (imageorderingModule.activityState === MODES.PREVIEW) {
      setImageOrderingActivityState({
        moduleId,
        activityState: activityState === MODES.BACK_TO_EDIT ? 'edit' : 'finish',
      });
    }

    setImageorderingModule({
      questId,
      questUUID,
      moduleId,
      moduleUUID,
      button: activityState,
    }).then(({ payload: { refreshStep, refreshModule } }: any): void => {
      if (refreshStep) {
        refreshQuestStep();
      } else if (refreshModule) {
        this.getImageOrderingModule();
      }

      if (scrollIntoView) {
        this.moduleRef.current.scrollIntoView();
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
    const {
      imageorderingModule,
      getDataCollectionSlotImages,
      questDataCollectionSlotImages,
      user,
      loading,
      readOnly,
      handleBacktoQuest,
    } = this.props;

    const {
      activityTitle,
      activityStatus,
      activityInstructions,
      activityState,
    } = imageorderingModule;

    return (
      <div className="montage-module quest-qa-free-form" ref={this.moduleRef}>
        <QuestStepModuleHeader
          title={activityTitle}
          completed={activityStatus === ACTIVITY_STATES.complete}
          instructions={activityInstructions}
        />

        {(activityState === MODES.EDIT ||
          activityState === MODES.PREVIEW ||
          activityState === MODES.REVIEW ||
          activityState === MODES.NONE) && (
          <EditMode
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
            readOnly={readOnly}
            handleBacktoQuest={handleBacktoQuest}
          />
        )}

        {activityState === MODES.PREVIEW && (
          <PreviewMode
            imageOrderingModule={imageorderingModule}
            setImageOrderingModule={this.setImageOrderingModule}
          />
        )}

        {activityState === MODES.FINISHED && (
          <FinishMode
            imageOrderingModule={imageorderingModule}
            setImageOrderingModule={this.setImageOrderingModule}
          />
        )}
      </div>
    );
  }
}
