import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ImageSlot } from 'app/modules/quests/components/quest-modules/imageordering/edit-mode/imageSlot';
import { DataCollectionSlotModal } from 'app/modules/quests/components/quest-modules/data-collection/data-collection-slot-modal';
import { MODES } from 'app/modules/quests/constants/montageModule';
import {
  ImageorderingModuleResponse,
  IQuestDataCollectionSlot,
  IQuestDataCollectionSlotImage,
  IQuestDataCollectionSlotImages,
} from 'app/modules/quests/types';
import { Tooltip } from 'react-tippy';

type TEditModeProps = {
  activityState: string;
  getImageOrderingModule?: () => void;
  setImageOrderingModule?: (
    activityState: string,
    scrollIntoView?: boolean
  ) => void;
  getDataCollectionSlotImages?: () => void;
  setDataCollectionSlotImages?: (
    image: IQuestDataCollectionSlotImage,
    selectedSlot: IQuestDataCollectionSlot,
    deleteSlotImage?: boolean
  ) => void;
  removeDataCollectionSlotImage?: (slotId: number, imageId: number) => void;
  imageOrderingModule?: ImageorderingModuleResponse;
  slot?: IQuestDataCollectionSlot;
  loading?: boolean;
  questDataCollectionSlotImages?: IQuestDataCollectionSlotImages;
  user?: User;
};

const INITIAL_SELECTED_SLOT = {} as IQuestDataCollectionSlot;

export const EditMode: React.FC<TEditModeProps> = props => {
  const {
    activityState,
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
    previewButtonCaption,
    enablePreviewButton,
    showPreviewButton,
    previewButtonTooltipText,
    exitReviewButtonCaption,
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
          readOnly={activityState === MODES.REVIEW}
          mmSlotModalVisible={mmSlotModalVisible}
        />
      ))}

      {mmSlotModalVisible && activityState !== MODES.REVIEW && (
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
        {activityState === MODES.EDIT && showPreviewButton && (
          <Tooltip
            title={previewButtonTooltipText || ''}
            theme="light"
            distance={10}
            position="top"
          >
            <Button
              onClick={(): void => {
                setImageOrderingModule(MODES.PREVIEW);
              }}
              disabled={!enablePreviewButton}
            >
              {previewButtonCaption}
            </Button>
          </Tooltip>
        )}

        {activityState === MODES.EDIT && showFinishButton && (
          <Tooltip
            title={finishButtonTooltipText}
            theme="light"
            distance={10}
            position="top"
          >
            <Button
              onClick={(): void => {
                setImageOrderingModule(MODES.FINISH, true);
              }}
              disabled={!enableFinishButton}
            >
              {finishButtonCaption}
            </Button>
          </Tooltip>
        )}

        {activityState === MODES.REVIEW && (
          <Tooltip
            title={exitReviewButtonTooltipText}
            theme="light"
            distance={10}
            position="top"
          >
            <Button
              onClick={(): void => {
                setImageOrderingModule(MODES.FINISH, true);
              }}
            >
              {exitReviewButtonCaption}
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
