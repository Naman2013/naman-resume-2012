import React from 'react';
import './styles.scss';
import { Link } from 'react-router';

export const QuestStepInfo = ({ stepData }) => {
  const {
    stepModulePrompt,
    stepModuleInstructions,
    showNextStepButtonTop,
    nextStepButtonTopCaption,
    nextStepButtonTopURL,
    claimBadgeButtonCaption,
    showClaimBadgeButtonTop,
    showClaimBadgeButtonBottom,
    claimBadgeButtonURL,
  } = stepData;
  return (
    <div className="quest-step-info">
      <div>
        <div className="quest-step-title">{stepModulePrompt}</div>
        <div className="quest-step-description">{stepModuleInstructions}</div>
      </div>
      {showNextStepButtonTop && (
        <Link
          className="quest-next-step-btn btn btn-primary"
          to={nextStepButtonTopURL}
        >
          {nextStepButtonTopCaption}
        </Link>
      )}
      {showClaimBadgeButtonTop && (
        <Link
          className="quest-next-step-btn btn btn-primary"
          to={claimBadgeButtonURL}
        >
          {claimBadgeButtonCaption}
        </Link>
      )}
    </div>
  );
};
