import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'app/components/modal';
import { ImageorderingModuleResponse } from 'app/modules/quests/types.ts';
import './styles.scss';

type PreviewModeProps = {
  imageOrderingModule?: ImageorderingModuleResponse;
  goToEdit?: () => void;
  goToFinish?: () => void;
  completed?: boolean;
};

export const PreviewMode: React.FC<PreviewModeProps> = props => {
  const { imageOrderingModule, completed, goToEdit, goToFinish } = props;

  return (
    <Modal show onHide={goToEdit} goBackText="GO BACK" disableGoBack={false}>
      <div className="montage-preview-mode">
        <div className="montage-preview-header">
          <h6>{imageOrderingModule.previewHeading}</h6>
          <h2>{imageOrderingModule.previewSubheading}</h2>
        </div>

        <div className="montage-preview-body">
          <img
            className="montage-preview-img"
            src={imageOrderingModule.previewURL}
            alt="preview"
          />
        </div>

        <div className="montage-preview-footer">
          {completed && (
            <Button className="btn-white finish-btn" onClick={goToFinish}>
              {imageOrderingModule.previewFinishButtonCaption}
            </Button>
          )}

          <Button className="btn-white" onClick={goToEdit}>
            {imageOrderingModule.previewBackToTasksButtonCaption}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
