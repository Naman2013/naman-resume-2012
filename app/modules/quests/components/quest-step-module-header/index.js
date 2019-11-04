import React from 'react';
import { CompleteCheckbox } from 'app/modules/quests/components/complete-checkbox';
import './styles.scss';

export const QuestStepModuleHeader = props => {
  const { title, completed, sequenceText } = props;

  return (
    <div className="quest-step-module-header">
      <div className="quest-step-module-mobile-title-container">
        <div className="quest-step-module-sequence-title">{sequenceText}</div>
        <CompleteCheckbox completed={completed} />
      </div>
      <div className="quest-step-module-title-container">
        <div className="quest-step-module-title">{title}</div>
        <CompleteCheckbox completed={completed} />
      </div>
    </div>
  );
};
