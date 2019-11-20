import React from 'react';
import { Button } from 'react-bootstrap';
import { ImageSlot } from 'app/modules/quests/components/quest-modules/imageordering/edit-mode/imageSlot';

type EditModeProps = {
  readonly?: boolean; // TRUE if Finish mode
  goToPreview?: () => void;
  imageOrderingModule?: any;
  previewReviewButtonCaption?: string;
};

export const EditMode: React.FC<EditModeProps> = props => {
  const { readonly = false, goToPreview, imageOrderingModule } = props;
  const { previewReviewButtonCaption } = imageOrderingModule;

  return (
    <div>
      <ImageSlot imageOrderingModule={imageOrderingModule} />
      <div className="text-center">
        <Button onClick={goToPreview}>{previewReviewButtonCaption}</Button>
      </div>
    </div>
  );
};
