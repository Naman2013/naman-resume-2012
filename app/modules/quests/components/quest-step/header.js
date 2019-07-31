import React, { useState } from 'react';
import BackArrow from 'atoms/icons/BackArrow';
import Dots from 'atoms/icons/Dots';
import Btn from 'atoms/Btn/index';
import { Link } from 'react-router';
import cn from 'classnames';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
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
}) => {
  const [isOpen, toggleMenu] = useState(false);
  return (
    <div className="header-root">
      <div className="step-header">
        <div className="step-back">
          <Link to={`/quest-details/${questId}`}>
            <BackArrow />
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
          <Btn
            onClick={navigateToPrevStep}
            className={cn('step-button-container', disablePrev && 'disabled')}
          >
            <div className="icon-slider-left prev" />
          </Btn>
          <Btn
            onClick={navigateToNextStep}
            className={cn('step-button-container', disableNext && 'disabled')}
          >
            <div className="icon-slider-right next" />
          </Btn>
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
          <Dots theme={{ circleColor: astronaut }} />
        </div>
      </div>
      <QuestStepContextMenu
        menuTopAdjustment={93}
        stepId={stepId}
        isOpen={isOpen}
        stepMenuList={stepMenuList}
        title={stepMenuTitle}
        onClose={() => toggleMenu(false)}
        questId={questId}
      />
    </div>
  );
};
