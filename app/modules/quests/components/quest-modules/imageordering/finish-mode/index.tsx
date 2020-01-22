import * as React from 'react';
import { Button } from 'react-bootstrap';
import { ImageorderingModuleResponse } from 'app/modules/quests/types.ts';
import { downloadFile } from 'app/utils/downloadFile';
import { Tooltip } from 'react-tippy';
import './styles.scss';
import { MODES } from 'app/modules/quests/constants/montageModule';

type FinishModeProps = {
  imageOrderingModule?: ImageorderingModuleResponse;
  setImageOrderingModule?: (
    activityState: string,
    scrollIntoView?: boolean
  ) => void;
};

export const FinishMode: React.FC<FinishModeProps> = props => {
  const { imageOrderingModule, setImageOrderingModule } = props;
  const {
    outputURL,
    outputHeading,
    outputSubheading,
    outputDownloadURL,
    reviewWorkButtonCaption,
    enableReviewWorkButton,
    showReviewWorkButton,
    reviewWorkButtonTooltipText,
    downloadButtonTooltipText,
    enableDownloadButton,
    showDownloadButton,
    showEditWorkButton,
    enableEditWorkButton,
    editWorkButtonTooltipText,
    editWorkButtonCaption,
  } = imageOrderingModule;

  return (
    <div className="montage-finish-mode">
      <div className="montage-finish-card">
        <div className="montage-finish-card-image">
          <img src={`${outputURL}?time=${Date.now()}`} alt="" />
        </div>

        <div className="montage-finish-card-title">{outputHeading}</div>

        <div className="montage-finish-card-subtitle">{outputSubheading}</div>
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
                setImageOrderingModule(MODES.REVIEW, true);
              }}
              disabled={!enableReviewWorkButton}
            >
              {reviewWorkButtonCaption}
            </Button>
          </Tooltip>
        )}

        {showEditWorkButton && (
          <Tooltip
            title={editWorkButtonTooltipText}
            theme="light"
            distance={10}
            position="top"
          >
            <Button
              onClick={(): void => {
                setImageOrderingModule(MODES.EDIT_WORK, true);
              }}
              disabled={!enableEditWorkButton}
            >
              {editWorkButtonCaption}
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
      </div>
    </div>
  );
};
