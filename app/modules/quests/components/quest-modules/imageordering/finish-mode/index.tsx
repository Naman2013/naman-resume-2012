import * as React from 'react';
import { Button } from 'react-bootstrap';
import { ImageorderingModuleResponse } from 'app/modules/quests/types.ts';
import { downloadFile } from 'app/utils/downloadFile';
import './styles.scss';

type FinishModeProps = {
  imageOrderingModule?: ImageorderingModuleResponse;
  goToReview?: () => void;
};

export const FinishMode: React.FC<FinishModeProps> = props => {
  const { imageOrderingModule, goToReview } = props;

  return (
    <div className="montage-finish-mode">
      <div className="animation-completed__card">
        <div className="animation-completed__card-image">
          <img src={imageOrderingModule.previewURL} alt="" />
        </div>

        <div className="animation-completed__card-title">
          {imageOrderingModule.previewFinalHeading}
        </div>

        <div className="animation-completed__card-subtitle">
          {imageOrderingModule.previewFinalSubheading}
        </div>
      </div>

      <div className="montage-finish-mode-actions">
        <Button onClick={goToReview}>
          {imageOrderingModule.previewReviewButtonCaption}
        </Button>

        <div className="montage-finish-mode-actions-separator" />

        <Button
          className="download"
          onClick={() =>
            downloadFile(imageOrderingModule.outputDownloadURL, 'result.png')
          }
        >
          <i className="icon white icon-download" />
        </Button>
      </div>
    </div>
  );
};
