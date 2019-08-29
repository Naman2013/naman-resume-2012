import React from 'react';
import { CompleteCheckbox } from 'app/modules/quests/components/complete-checkbox';
import './styles.scss';

export const QuestQaHeader = props => {
  const { title, completed, sequenceText } = props;

  return (
    <div className="quest-qa-header">
      <div className="quest-qa-mobile-title-container">
        <div className="quest-qa-sequence-title">{sequenceText}</div>
        <CompleteCheckbox completed={completed} />
      </div>
      <div className="quest-qa-title-container">
        <div className="quest-qa-title">{title}</div>
        <CompleteCheckbox completed={completed} />
      </div>
    </div>
  );
};
