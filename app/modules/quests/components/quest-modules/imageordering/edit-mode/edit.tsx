import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ImageSlot } from 'app/modules/quests/components/quest-modules/imageordering/edit-mode/imageSlot';
import { DataCollectionSlotModal } from 'app/modules/quests/components/quest-modules/data-collection/data-collection-slot-modal';

type EditModeProps = {
  readonly?: boolean; // TRUE if Finish mode
  goToPreview?: () => void;
  getDataCollectionSlotImages?: () => void;
  setDataCollectionSlotImages?: (image: any, selectedSlot: any) => object;
  imageOrderingModule?: any;
  previewReviewButtonCaption?: string;
  slot?: any;
  loading?: boolean;
  questDataCollectionSlotImages?: object;
};

export const EditMode: React.FC<EditModeProps> = props => {
  const {
    readonly = false,
    goToPreview,
    imageOrderingModule,
    setDataCollectionSlotImages,
    getDataCollectionSlotImages,
    questDataCollectionSlotImages,
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
      {slotArray.map((slot: any) => (
        <ImageSlot
          imageOrderingModule={imageOrderingModule}
          slot={slot}
          showMontageModuleSlotModal={() => {
            openMMSlotModal(true);
            setSelectedSlot(slot);
          }}
        />
      ))}
      {mmSlotModalVisible && (
        <DataCollectionSlotModal
          show
          onHide={() => {
            openMMSlotModal(false);
          }}
          questDataCollectionSlotImages={questDataCollectionSlotImages}
          selectedSlot={selectedSlot}
          getDataCollectionSlotImages={getDataCollectionSlotImages}
          setDataCollectionSlotImages={(image: any) =>
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
