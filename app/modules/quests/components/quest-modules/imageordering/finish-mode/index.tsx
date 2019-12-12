import * as React from 'react';
import { Button } from 'react-bootstrap';
import { ImageorderingModuleResponse } from 'app/modules/quests/types.ts';
import { downloadFile } from 'app/utils/downloadFile';
import { Tooltip } from 'react-tippy';
import './styles.scss';

type FinishModeProps = {
  imageOrderingModule?: ImageorderingModuleResponse;
  goToReview?: () => void;
};

export const FinishMode: React.FC<FinishModeProps> = props => {
  const { imageOrderingModule, goToReview } = props;
  const {
    previewURL,
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
  } = imageOrderingModule;

  return (
    <div className="montage-finish-mode">
      <div className="animation-completed__card">
        <div className="animation-completed__card-image">
          <img src={previewURL} alt="" />
        </div>

        <div className="animation-completed__card-title">
          {previewFinalHeading}
        </div>

        <div className="animation-completed__card-subtitle">
          {previewFinalSubheading}
        </div>
      </div>

      <div className="montage-finish-mode-actions">
        {showReviewWorkButton && (
          <Tooltip
            title={reviewWorkButtonTooltipText}
            theme="light"
            distance={10}
            position="top"
          >
            <Button onClick={goToReview} disabled={!enableReviewWorkButton}>
              {reviewWorkButtonCaption}
            </Button>
          </Tooltip>
        )}

        <div className="montage-finish-mode-actions-separator" />

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
                downloadFile(outputDownloadURL, 'result.png')
              }
              disabled={!enableDownloadButton}
            >
              <i className="icon white icon-download" />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
