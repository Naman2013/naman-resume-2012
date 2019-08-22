// @flow

import React from 'react';
import cn from 'classnames';
import { Button } from 'react-bootstrap';
import './footer.scss';

export const QuestStepFooter = ({
  navigateToNextStep,
  navigateToLastStep,
  disableNext,
  disableLast,
  stepFooterTitle,
  currentlyViewingCaption,
  nextButtonCaption,
  lastButtonCaption,
  enableLastButton,
  enableNextButton,
}) => (
  <div className="step-footer">
    <div>
      <Button
        onClick={navigateToLastStep}
        className={cn('dashed-btn', disableLast && 'disabled')}
        disabled={!enableLastButton}
      >
        <span>{lastButtonCaption}</span>
      </Button>
    </div>
    <div className="step-footer-title">
      <div dangerouslySetInnerHTML={{ __html: currentlyViewingCaption }} />
      <div dangerouslySetInnerHTML={{ __html: stepFooterTitle }} />
    </div>
    <div>
      <Button
        onClick={navigateToNextStep}
        className={cn('dashed-btn', disableNext && 'disabled')}
        disabled={!enableNextButton}
      >
        <span>{nextButtonCaption}</span>
      </Button>
    </div>
  </div>
);
