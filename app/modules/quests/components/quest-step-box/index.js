import { CompleteCheckbox } from 'app/modules/quests/components/complete-checkbox';
import { QuestStepInfo } from 'app/modules/quests/components/quest-step-info';
import { questShield } from 'app/styles/variables/iconURLs';
import React from 'react';
import './styles.scss';
import { Button } from 'react-bootstrap';
import ResourcesButton from '../quest-details/resources-button.redux';

export const QuestStepBox = props => {
  const {
    children,
    completed,
    stepData,
    questId,
    showHeader,
    showModule,
  } = props;
  const {
    showResources,
    stepHeaderTitle,
    resourcesModuleId,
    resourcesButtonCaption,
    stepTopTitle,
    showStepProgressMsg,
    stepProgressMsg,
    iconURL,
  } = stepData;
  const resourcesProps = {
    resourcesButtonText: resourcesButtonCaption,
    questId,
    moduleId: resourcesModuleId,
  };

  return (
    <div className="quest-step-box">
      {showHeader && (
        <>
          {/* TABLET/DESKTOP VIEW */}
          <div className="d-none d-md-block desktop-view">
            <div className="shield-row step-box-row">
              <div className="grey-ball" />
              <div className="shield">
                <img
                  className="shield-background"
                  src={questShield}
                  alt="questShield"
                />
                <img src={iconURL} alt="" className="quest-icon" />
              </div>
              <div className="grey-ball" />
            </div>

            <div className="step-title-row step-box-row">
              <span className="step-title">{stepTopTitle}</span>
              <CompleteCheckbox completed={completed} />
            </div>

            <div className="sub-title-row step-box-row">
              <span className="sub-title">
                {showStepProgressMsg && stepProgressMsg}
              </span>

              <div className="step-controls">
                {showResources ? <ResourcesButton {...resourcesProps} /> : null}
              </div>
            </div>

            <QuestStepInfo stepData={stepData} />
          </div>

          {/* MOBILE VIEW */}
          <div className="d-sm-block d-md-none mobile-view-step-info">
            <div className="step-box-row">
              <span className="step-number">{stepHeaderTitle}</span>
              <CompleteCheckbox completed={completed} sm />
            </div>
            <div className="step-box-row">
              <span className="step-title">{stepTopTitle}</span>
            </div>
            <div className="step-box-row">
              {showStepProgressMsg && (
                <span className="step-sub-title">{stepProgressMsg}</span>
              )}
            </div>
            <div className="step-box-row">
              {showResources ? <ResourcesButton {...resourcesProps} /> : null}
            </div>

            <QuestStepInfo stepData={stepData} />
          </div>
        </>
      )}

      {showModule && <div className="step-modules">{children}</div>}
    </div>
  );
};
