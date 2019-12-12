import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'app/components/modal';
import { ImageorderingModuleResponse } from 'app/modules/quests/types.ts';
import { Tooltip } from 'react-tippy';
import './styles.scss';

type PreviewModeProps = {
  imageOrderingModule?: ImageorderingModuleResponse;
  goToEdit?: () => void;
  goToFinish?: () => void;
  completed?: boolean;
};

export const PreviewMode: React.FC<PreviewModeProps> = props => {
  const { imageOrderingModule, goToEdit, goToFinish } = props;
  const {
    previewHeading,
    previewSubheading,
    previewURL,
    previewGoBackButtonCaption,
    previewBackToTasksButtonCaption,
    finishButtonTooltipText,
    showFinishButton,
    enableFinishButton,
    finishButtonCaption,
  } = imageOrderingModule;

  return (
    <Modal
      show
      onHide={goToEdit}
      goBackText={previewGoBackButtonCaption}
      disableGoBack={false}
    >
      <div className="montage-preview-mode">
        <div className="montage-preview-header">
          <h6>{previewHeading}</h6>
          <h2>{previewSubheading}</h2>
        </div>

        <div className="montage-preview-body">
          <img className="montage-preview-img" src={previewURL} alt="preview" />
        </div>

        <div className="montage-preview-footer">
          {showFinishButton && (
            <Tooltip
              title={finishButtonTooltipText}
              theme="light"
              distance={10}
              position="top"
            >
              <Button
                className="btn-white finish-btn"
                onClick={goToFinish}
                disabled={!enableFinishButton}
              >
                {finishButtonCaption}
              </Button>
            </Tooltip>
          )}

          <Button className="btn-white" onClick={goToEdit}>
            {previewBackToTasksButtonCaption}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
