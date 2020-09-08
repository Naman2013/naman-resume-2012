import { QuestStepInfo } from 'app/modules/quests/components/quest-step-info';
import { questShield } from 'app/styles/variables/iconURLs';
import React from 'react';
import cx from 'classnames';
import './styles.scss';
import ResourcesButton from '../quest-details/resources-button.redux';

export const QuestStepBox = props => {
  const {
    children,
    stepData,
    questId,
    showHeader,
    showModule,
    setQuestCompleted,
    showFooterClaimButton,
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
    claimBadgeButtonCaption,
    showClaimBadgeButtonBottom,
    stepIconURL,
    readOnly,
  } = stepData;
  const resourcesProps = {
    resourcesButtonText: resourcesButtonCaption,
    questId,
    moduleId: resourcesModuleId,
  };

  return (
    <div className={cx('quest-step-box', { 'first-module': showHeader })}>
      {showHeader && (
        <>
          {/* TABLET/DESKTOP VIEW */}
          <div className="d-none d-md-block desktop-view">
            <div className="shield-row step-box-row">
              <div className="grey-ball" />
              <div className="shield">
                {/* <img
                  className="shield-background"
                  src={questShield}
                  alt="questShield"
                /> */}
                <img src={iconURL} alt="" className="quest-icon" />
              </div>
              <div className="grey-ball" />
            </div>

            <div className="step-title-row step-box-row">
              <span className="step-title">{stepTopTitle}</span>
              <img src={stepIconURL} alt="" className="step-completed-icon" />
            </div>

            <div className="sub-title-row step-box-row">
              <span className="sub-title">
                {showStepProgressMsg && stepProgressMsg}
              </span>

              <div
                className={cx(
                  'step-controls',
                  !showResources ? 'step-controls-hide' : null
                )}
              >
                {showResources ? <ResourcesButton {...resourcesProps} /> : null}
              </div>
            </div>

            <QuestStepInfo
              stepData={stepData}
              setQuestCompleted={setQuestCompleted}
            />
          </div>

          {/* MOBILE VIEW */}
          <div className="d-sm-block d-md-none mobile-view-step-info">
            <div className="step-box-row">
              <span className="step-number">{stepHeaderTitle}</span>
              <img
                src={stepIconURL}
                alt=""
                className="step-completed-icon-sm"
              />
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

      {showModule && (
        <div className="step-modules">
          {children}
          {showFooterClaimButton && showClaimBadgeButtonBottom && (
            <div className="text-center ">
              <a
                onClick={!readOnly && setQuestCompleted}
                className={cx('quest-next-step-btn', 'btn', 'btn-primary', {
                  disabled: readOnly,
                })}
              >
                {claimBadgeButtonCaption}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
