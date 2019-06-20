import React from 'react';
import BackArrow from 'atoms/icons/BackArrow';
import Dots from 'atoms/icons/Dots';
import Btn from 'atoms/Btn/index';
import { Link } from 'react-router';
import cn from 'classnames';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import './header.scss';

export const QuestStepHeader = ({
  navigateToPrevStep,
  navigateToNextStep,
  questId,
  disablePrev,
  disableNext,
  stepHeaderTitle,
}) => (
  <div className="step-header">
    <div className="step-back">
      <Link to={`/quest-details/${questId}`}>
        <BackArrow />
      </Link>
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
      <div className="step-button-container">
        <Dots theme={{ circleColor: astronaut }} />
      </div>
    </div>
  </div>
);
