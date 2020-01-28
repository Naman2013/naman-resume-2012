import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ImageSlot } from 'app/modules/quests/components/quest-modules/imageordering/edit-mode/imageSlot';
import { DataCollectionSlotModal } from 'app/modules/quests/components/quest-modules/data-collection/data-collection-slot-modal';
import { IImageOrderingSlot } from 'app/modules/quests/types.ts';

type EditModeProps = {
  readonly?: boolean; // TRUE if Finish mode
  goToPreview?: () => void;
  getImageOrderingModule?: () => void;
  getDataCollectionSlotImages?: () => void;
  setDataCollectionSlotImages?: (
    image: any,
    selectedSlot: any,
    deleteSlotImage?: boolean
  ) => void;
  removeDataCollectionSlotImage?: (slotId: number, imageId: number) => void;
  imageOrderingModule?: any;
  previewReviewButtonCaption?: string;
  slot?: IImageOrderingSlot;
  loading?: boolean;
  questDataCollectionSlotImages?: object;
  user?: User;
};

export const EditMode: React.FC<EditModeProps> = props => {
  const {
    readonly = false,
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
    previewEditButtonCaption,
    slotArray = [],
  } = imageOrderingModule;
  const [mmSlotModalVisible, openMMSlotModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({});

  return (
    <div>
      {slotArray.map((slot: IImageOrderingSlot) => (
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
        />
      ))}
      {mmSlotModalVisible && (
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
      <div className="text-center">
        <Button onClick={goToPreview}>{previewEditButtonCaption}</Button>
      </div>
    </div>
  );
};
