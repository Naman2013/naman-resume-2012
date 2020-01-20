import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ImageSlot } from 'app/modules/quests/components/quest-modules/imageordering/edit-mode/imageSlot';
import { DataCollectionSlotModal } from 'app/modules/quests/components/quest-modules/data-collection/data-collection-slot-modal';
import { MODE, MODES } from 'app/modules/quests/constants/montageModule';
import {
  ImageorderingModuleResponse,
  IQuestDataCollectionSlot,
  IQuestDataCollectionSlotImage,
  IQuestDataCollectionSlotImages,
} from 'app/modules/quests/types';
import { Tooltip } from 'react-tippy';

type TEditModeProps = {
  readOnly?: boolean; // TRUE if Finish mode
  mode: number;
  goToPreview?: () => void;
  goToFinish?: () => void;
  getImageOrderingModule?: () => void;
  setImageOrderingModule?: (mode: string) => Promise<any>;
  getDataCollectionSlotImages?: () => void;
  setDataCollectionSlotImages?: (
    image: IQuestDataCollectionSlotImage,
    selectedSlot: IQuestDataCollectionSlot,
    deleteSlotImage?: boolean
  ) => void;
  removeDataCollectionSlotImage?: (slotId: number, imageId: number) => void;
  imageOrderingModule?: ImageorderingModuleResponse;
  previewReviewButtonCaption?: string;
  slot?: IQuestDataCollectionSlot;
  loading?: boolean;
  questDataCollectionSlotImages?: IQuestDataCollectionSlotImages;
  user?: User;
};

const INITIAL_SELECTED_SLOT = {} as IQuestDataCollectionSlot;

export const EditMode: React.FC<TEditModeProps> = props => {
  const {
    readOnly,
    mode,
    goToPreview,
    goToFinish,
    imageOrderingModule,
    getImageOrderingModule,
    setImageOrderingModule,
    setDataCollectionSlotImages,
    getDataCollectionSlotImages,
    removeDataCollectionSlotImage,
    questDataCollectionSlotImages,
    user,
    loading,
  } = props;
  const {
    moduleId,
    questId,
    previewEditButtonCaption,
    enablePreviewButton,
    showPreviewButton,
    previewButtonTooltipText,
    exitReviewButtonCaption,
    enableExitReviewButton,
    showExitReviewButton,
    exitReviewButtonTooltipText,
    showFinishButton,
    finishButtonTooltipText,
    enableFinishButton,
    finishButtonCaption,
    slotArray = [],
  } = imageOrderingModule;
  const [mmSlotModalVisible, openMMSlotModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(INITIAL_SELECTED_SLOT);

  return (
    <div>
      {slotArray.map((slot: IQuestDataCollectionSlot) => (
        <ImageSlot
          key={slot.slotId}
          imageOrderingModule={imageOrderingModule}
          getImageOrderingModule={getImageOrderingModule}
          slot={slot}
          showMontageModuleSlotModal={(): void => {
            openMMSlotModal(true);
            setSelectedSlot(slot);
          }}
          removeDataCollectionSlotImage={removeDataCollectionSlotImage}
          user={user}
          readOnly={readOnly}
          mmSlotModalVisible={mmSlotModalVisible}
        />
      ))}

      {mmSlotModalVisible && !readOnly && (
        <DataCollectionSlotModal
          show
          onHide={(): void => {
            openMMSlotModal(false);
          }}
          questDataCollectionSlotImages={questDataCollectionSlotImages}
          selectedSlot={selectedSlot}
          getDataCollectionSlotImages={getDataCollectionSlotImages}
          setDataCollectionSlotImages={(image: any): void =>
            setDataCollectionSlotImages(image, selectedSlot)
          }
          moduleId={moduleId}
          questId={questId}
          loading={loading}
        />
      )}

      <div className="montage-edit-mode-actions text-center">
        {mode === MODE.edit && showPreviewButton && (
          <Tooltip
            title={previewButtonTooltipText || ''}
            theme="light"
            distance={10}
            position="top"
          >
            <Button
              onClick={(): void => {
                setImageOrderingModule(MODES.PREVIEW).then(
                  ({ payload: { apiError } }) => {
                    if (!apiError) {
                      goToPreview();
                    }
                  }
                );
              }}
              disabled={!enablePreviewButton}
            >
              {previewEditButtonCaption}
            </Button>
          </Tooltip>
        )}

        {mode === MODE.edit && showFinishButton && (
          <Tooltip
            title={finishButtonTooltipText}
            theme="light"
            distance={10}
            position="top"
          >
            <Button
              onClick={(): void => {
                setImageOrderingModule(MODES.FINISH).then(
                  ({ payload: { apiError } }) => {
                    if (!apiError) {
                      goToFinish();
                    }
                  }
                );
              }}
              disabled={!enableFinishButton}
            >
              {finishButtonCaption}
            </Button>
          </Tooltip>
        )}

        {mode === MODE.review && showExitReviewButton && (
          <Tooltip
            title={exitReviewButtonTooltipText || ''}
            theme="light"
            distance={10}
            position="top"
          >
            <Button
              onClick={(): void => {
                goToPreview();
                setImageOrderingModule(MODES.PREVIEW);
              }}
              disabled={!enableExitReviewButton}
            >
              {exitReviewButtonCaption}
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
