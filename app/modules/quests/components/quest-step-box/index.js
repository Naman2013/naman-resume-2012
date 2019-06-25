import { CompleteCheckbox } from 'app/modules/quests/components/complete-checkbox';
import { questShield } from 'app/styles/variables/iconURLs';
import React from 'react';
import './styles.scss';

export const QuestStepBox = props => {
  const { children, subTitle, title, completed } = props;
  return (
    <div className="quest-step-box">
      <div className="shield-row">
        <div className="grey-ball" />
        <div className="shield">
          <img src={questShield} alt="questShield" />
        </div>
        <div className="grey-ball" />
      </div>

      <div className="step-title-row">
        <span className="step-title">{title}</span>
        <CompleteCheckbox completed={completed} />
      </div>
    </div>
  );
};
