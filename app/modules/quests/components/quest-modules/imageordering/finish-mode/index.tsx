import * as React from 'react';
import { Button } from 'react-bootstrap';
import { ImageorderingModuleResponse } from 'app/modules/quests/types.ts';
import { downloadFile } from 'app/utils/downloadFile';
import { Tooltip } from 'react-tippy';
import './styles.scss';
import { MODES } from 'app/modules/quests/constants/montageModule';

type FinishModeProps = {
  imageOrderingModule?: ImageorderingModuleResponse;
  setImageOrderingModule?: (activityState: string) => Promise<any>;
  goToReview?: () => void;
  goToEdit?: () => void;
};

export const FinishMode: React.FC<FinishModeProps> = props => {
  const {
    imageOrderingModule,
    setImageOrderingModule,
    goToEdit,
    goToReview,
  } = props;
  const {
    outputURL,
    previewFinalHeading,
    previewFinalSubheading,
    outputDownloadURL,
    reviewWorkButtonCaption,
    enableReviewWorkButton,
    showReviewWorkButton,
    reviewWorkButtonTooltipText,
    downloadButtonTooltipText,
    enableDownloadButton,
    showDownloadButton,
    backToEditButtonTooltipText,
    showBackToEditButton,
    enableBackToEditButton,
    backToEditButtonCaption,
  } = imageOrderingModule;

  return (
    <div className="montage-finish-mode">
      <div className="montage-finish-card">
        <div className="montage-finish-card-image">
          <img src={`${outputURL}?time=${Date.now()}`} alt="" />
        </div>

        <div className="montage-finish-card-title">{previewFinalHeading}</div>

        <div className="montage-finish-card-subtitle">
          {previewFinalSubheading}
        </div>
      </div>

      <div className="montage-finish-mode-actions text-center">
        {showReviewWorkButton && (
          <Tooltip
            title={reviewWorkButtonTooltipText}
            theme="light"
            distance={10}
            position="top"
          >
            <Button
              onClick={(): void => {
                setImageOrderingModule(MODES.REVIEW);
              }}
              disabled={!enableReviewWorkButton}
            >
              {reviewWorkButtonCaption}
            </Button>
          </Tooltip>
        )}

        {showDownloadButton && (
          <Tooltip
            title={downloadButtonTooltipText}
            theme="light"
            distance={10}
            position="top"
          >
            <Button
              className="download"
              onClick={(): void =>
                downloadFile(
                  `${outputDownloadURL}?time=${Date.now()}`,
                  outputDownloadURL.substring(
                    outputDownloadURL.lastIndexOf('/') + 1
                  )
                )
              }
              disabled={!enableDownloadButton}
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
  );
};
