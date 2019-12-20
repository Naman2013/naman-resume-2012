import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ImageSlot } from 'app/modules/quests/components/quest-modules/imageordering/edit-mode/imageSlot';
import { DataCollectionSlotModal } from 'app/modules/quests/components/quest-modules/data-collection/data-collection-slot-modal';
import { MODE } from 'app/modules/quests/constants/montageModule';
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
  getImageOrderingModule?: () => void;
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

type slotModalVisible = {
  mmSlotModalVisible: boolean;
};

const INITIAL_SELECTED_SLOT = {} as IQuestDataCollectionSlot;

export const EditMode: React.FC<TEditModeProps> = props => {
  const {
    readOnly,
    mode,
    goToPreview,
    imageOrderingModule,
    getImageOrderingModule,
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
    enableExitReviewButton,
    showExitReviewButton,
    exitReviewButtonTooltipText,
    slotArray = [],
  } = imageOrderingModule;
  const [mmSlotModalVisible, openMMSlotModal] = React.useState<
    slotModalVisible | any
  >(false);
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

      {mode === MODE.edit && showPreviewButton && (
        <div className="text-center">
          <Tooltip
            title={previewButtonTooltipText || ''}
            theme="light"
            distance={10}
            position="top"
          >
            <Button onClick={goToPreview} disabled={!enablePreviewButton}>
              {previewButtonCaption}
            </Button>
          </Tooltip>
        </div>
      )}

      {mode === MODE.review && showExitReviewButton && (
        <div className="text-center">
          <Tooltip
            title={exitReviewButtonTooltipText || ''}
            theme="light"
            distance={10}
            position="top"
          >
            <Button onClick={goToPreview} disabled={!enableExitReviewButton}>
              {exitReviewButtonCaption}
            </Button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};
