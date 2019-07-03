import React from 'react';
import './styles.scss';

export const QuestStepInfo = props => {
  const { title, description } = props;
  return (
    <div className="quest-step-info">
      <div className="quest-step-title">{title}</div>
      <div className="quest-step-description">{description}</div>
    </div>
  );
};
