// @flow

import React from 'react';
import cn from 'classnames';
import Btn from 'atoms/Btn/index';
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
}) => (
  <div className="step-footer">
    <div>
      <Btn
        onClick={navigateToLastStep}
        className={cn('dashed-btn', disableLast && 'disabled')}
      >
        <span>{lastButtonCaption}</span>
      </Btn>
    </div>
    <div className="step-footer-title">
      <div dangerouslySetInnerHTML={{ __html: currentlyViewingCaption }} />
      <div dangerouslySetInnerHTML={{ __html: stepFooterTitle }} />
    </div>
    <div>
      <Btn
        onClick={navigateToNextStep}
        className={cn('dashed-btn', disableNext && 'disabled')}
      >
        <span>{nextButtonCaption}</span>
      </Btn>
    </div>
  </div>
);
