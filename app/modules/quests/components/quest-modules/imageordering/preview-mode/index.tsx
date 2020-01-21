import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'app/components/modal';
import { ImageorderingModuleResponse } from 'app/modules/quests/types.ts';
import { Tooltip } from 'react-tippy';
import './styles.scss';
import { downloadFile } from 'app/utils/downloadFile';
import { MODES } from 'app/modules/quests/constants/montageModule';

type PreviewModeProps = {
  imageOrderingModule?: ImageorderingModuleResponse;
  setImageOrderingModule?: (activityState: string) => Promise<any>;
  goToEdit?: () => void;
  goToFinish?: () => void;
  completed?: boolean;
};

export const PreviewMode: React.FC<PreviewModeProps> = props => {
  const { imageOrderingModule, goToEdit, setImageOrderingModule } = props;
  const {
    previewHeading,
    previewSubheading,
    previewURL,
    previewGoBackButtonCaption,
    backToEditButtonCaption,
    backToEditButtonTooltipText,
    enableBackToEditButton,
    showBackToEditButton,
    finishButtonTooltipText,
    showFinishButton,
    enableFinishButton,
    finishButtonCaption,
    downloadPreviewButtonTooltipText,
    showDownloadPreviewButton,
    previewDownloadURL,
    enableDownloadPreviewButton,
  } = imageOrderingModule;

  return (
    <Modal
      show
      onHide={(): void => {
        goToEdit();
        setImageOrderingModule('backToEdit');
      }}
      goBackText={previewGoBackButtonCaption}
      disableGoBack={false}
    >
      <div className="montage-preview-mode">
        <div className="montage-preview-header">
          <h6>{previewHeading}</h6>
          <h2>{previewSubheading}</h2>
        </div>

        <div className="montage-preview-body">
          <img
            className="montage-preview-img"
            src={`${previewURL}?time=${Date.now()}`}
            alt="preview"
          />
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
                onClick={(): void => {
                  setImageOrderingModule(MODES.FINISH);
                }}
                disabled={!enableFinishButton}
              >
                {finishButtonCaption}
              </Button>
            </Tooltip>
          )}

          {showDownloadPreviewButton && (
            <Tooltip
              title={downloadPreviewButtonTooltipText}
              theme="light"
              distance={10}
              position="top"
            >
              <Button
                className="download btn-white"
                onClick={(): void =>
                  downloadFile(
                    `${previewDownloadURL}?time=${Date.now()}`,
                    previewDownloadURL.substring(
                      previewDownloadURL.lastIndexOf('/') + 1
                    )
                  )
                }
                disabled={!enableDownloadPreviewButton}
              >
                <i className="icon white icon-download" />
              </Button>
            </Tooltip>
          )}

          {showBackToEditButton && (
            <Tooltip
              title={backToEditButtonTooltipText}
              theme="light"
              distance={10}
              position="top"
            >
              <Button
                className="btn-white"
                onClick={(): void => {
                  goToEdit();
                  setImageOrderingModule('backToEdit');
                }}
                disabled={!enableBackToEditButton}
              >
                {backToEditButtonCaption}
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
    </Modal>
  );
};
