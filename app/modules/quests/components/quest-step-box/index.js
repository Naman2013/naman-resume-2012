import { CompleteCheckbox } from 'app/modules/quests/components/complete-checkbox';
import { questShield } from 'app/styles/variables/iconURLs';
import React from 'react';
import './styles.scss';
import { Button } from 'react-bootstrap';
import ResourcesButton from '../quest-details/resources-button.redux';

export const QuestStepBox = props => {
  const { children, subTitle, completed, stepData, questId } = props;
  const {
    showResources,
    stepHeaderTitle,
    resourcesModuleId,
    resourcesButtonCaption,
  } = stepData;
  const resourcesProps = {
    resourcesButtonText: resourcesButtonCaption,
    questId,
    moduleId: resourcesModuleId,
  };

  return (
    <div className="quest-step-box">
      {/* TABLET/DESKTOP VIEW */}
      <div className="d-none d-md-block desktop-view">
        <div className="shield-row step-box-row">
          <div className="grey-ball" />
          <div className="shield">
            <img src={questShield} alt="questShield" />
          </div>
          <div className="grey-ball" />
        </div>

        <div className="step-title-row step-box-row">
          <span className="step-title">{stepHeaderTitle}</span>
          <CompleteCheckbox completed={completed} />
        </div>

        <div className="sub-title-row step-box-row">
          <span className="sub-title">{subTitle}</span>
          <div className="step-controls">
            {showResources ? <ResourcesButton {...resourcesProps} /> : null}
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="d-sm-block d-md-none mobile-view-step-info">
        <div className="step-box-row">
          <span className="step-number">{stepHeaderTitle}</span>
          <CompleteCheckbox completed={completed} sm />
        </div>
        <div className="step-box-row">
          <span className="step-title">{stepHeaderTitle}</span>
        </div>
        <div className="step-box-row">
          <span className="step-sub-title">{subTitle}</span>
        </div>
        <div className="step-box-row">
          {showResources ? <ResourcesButton {...resourcesProps} /> : null}
        </div>
      </div>

      <div className="step-modules">{children}</div>
    </div>
  );
};
