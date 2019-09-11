import React, { useState } from 'react';
import BackArrow from 'atoms/icons/BackArrow';
import Dots from 'atoms/icons/Dots';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import cn from 'classnames';
import {
  astronaut,
  lightHeadedAstronaut,
} from 'app/styles/variables/colors_tiles_v4';
import { QuestStepContextMenu } from './menu';
import './header.scss';

export const QuestStepHeader = ({
  navigateToPrevStep,
  navigateToNextStep,
  questId,
  disablePrev,
  disableNext,
  stepHeaderTitle,
  stepId,
  stepMenuList,
  stepMenuTitle,
  questCompletionList,
  showHeaderNextButton,
  enableHeaderNextButton,
  showHeaderLastButton,
  enableHeaderLastButton,
  callSetQuestCompleted,
}) => {
  const [isOpen, toggleMenu] = useState(false);
  return (
    <div className="header-root">
      <div className="step-header">
        <div className="step-back">
          <Link to={`/quest-details/${questId}`}>
            <BackArrow theme={{ arrowColor: lightHeadedAstronaut }} />
          </Link>
        </div>
        <div className="mobile-part">
          <div className="step-back-mobile">
            <Link to={`/quest-details/${questId}`}>
              <span className="icon icon-arrow-left" />
            </Link>
          </div>
          <div className="step-title-mobile">
            <span>BACK TO QUEST</span>
          </div>
        </div>
        <div
          className="step-title"
          dangerouslySetInnerHTML={{ __html: stepHeaderTitle }}
        />
        <div className="step-navigation">
          {showHeaderLastButton && (
            <Button
              onClick={navigateToPrevStep}
              className={cn('step-button-container', disablePrev && 'disabled')}
              disabled={!enableHeaderLastButton}
            >
              <div className="icon-slider-left prev" />
            </Button>
          )}
          {showHeaderNextButton && (
            <Button
              onClick={navigateToNextStep}
              className={cn('step-button-container', disableNext && 'disabled')}
              disabled={!enableHeaderNextButton}
            >
              <div className="icon-slider-right next" />
            </Button>
          )}
          <div
            onClick={() => toggleMenu(!isOpen)}
            className={cn('step-button-container open-menu', { open: isOpen })}
          >
            {!isOpen ? (
              <Dots theme={{ circleColor: astronaut }} />
            ) : (
              <i className="menu-icon-close icon-close" />
            )}
          </div>
        </div>
        <div
          onClick={() => toggleMenu(!isOpen)}
          className="step-navigation-mobile"
        >
          {!isOpen ? (
            <Dots theme={{ circleColor: astronaut }} />
          ) : (
            <i className="menu-icon-close icon-close" />
          )}
        </div>
      </div>
      <QuestStepContextMenu
        menuTopAdjustment={93}
        stepId={stepId}
        isOpen={isOpen}
        stepMenuList={stepMenuList}
        questCompletionList={questCompletionList}
        title={stepMenuTitle}
        onClose={() => toggleMenu(false)}
        questId={questId}
        callSetQuestCompleted={callSetQuestCompleted}
      />
    </div>
  );
};
