import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.scss';

export const QuestStepInfo = props => {
  const { title, description, isStepCompleted, navigateToNextStep } = props;
  return (
    <div className="quest-step-info">
      <div>
        <div className="quest-step-title">{title}</div>
        <div className="quest-step-description">{description}</div>
      </div>
      {isStepCompleted && (
        <Button className="quest-next-step-btn" onClick={navigateToNextStep}>
          Next Step
        </Button>
      )}
    </div>
  );
};
