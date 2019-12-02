import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import { IQuestAnimation } from 'app/modules/quests/types';

type PreviewAnimationControlsProps = {
  questAnimation: IQuestAnimation;
  onEdit: () => void;
  onFinish: () => void;
  onSpeedChange: (speed: number, singleStep: boolean) => void;
  onPrevFrame: () => void;
  onNextFrame: () => void;
};

const ANIMATION_SPEEDS = {
  SLOW: 'SLOW',
  MED: 'MED',
  FAST: 'FAST',
  SINGLE_STEP: 'SINGLE_STEP',
};

export const PreviewAnimationControls: React.FC<
  PreviewAnimationControlsProps
> = React.memo(props => {
  const {
    questAnimation,
    onEdit,
    onFinish,
    onSpeedChange,
    onPrevFrame,
    onNextFrame,
  } = props;
  const {
    fastButtonCaption,
    mediumButtonCaption,
    slowButtonCaption,
    editButtonCaption,
    finishButtonCaption,
    previewDelaySlow,
    previewDelayMedium,
    previewDelayFast,
  } = questAnimation;

  const [animationSpeed, setAnimationSpeed] = useState(ANIMATION_SPEEDS.SLOW);

  const onSpeedBtnClick = (type: string, speed: number): void => {
    setAnimationSpeed(type);
    onSpeedChange(speed, type === ANIMATION_SPEEDS.SINGLE_STEP);
  };

  return (
    <div className="animation-controls preview-controls">
      <div className="controls-block speed-actions">
        <div className="buttons-block">
          <Button
            className={cx('btn-white animation-view-btn', {
              'btn-active': animationSpeed === ANIMATION_SPEEDS.SLOW,
            })}
            onClick={(): void => {
              onSpeedBtnClick(ANIMATION_SPEEDS.SLOW, previewDelaySlow);
            }}
          >
            {slowButtonCaption}
          </Button>
          <Button
            className={cx('btn-white animation-view-btn', {
              'btn-active': animationSpeed === ANIMATION_SPEEDS.MED,
            })}
            onClick={(): void => {
              onSpeedBtnClick(ANIMATION_SPEEDS.MED, previewDelayMedium);
            }}
          >
            {mediumButtonCaption}
          </Button>
          <Button
            className={cx('btn-white animation-view-btn', {
              'btn-active': animationSpeed === ANIMATION_SPEEDS.FAST,
            })}
            onClick={(): void => {
              onSpeedBtnClick(ANIMATION_SPEEDS.FAST, previewDelayFast);
            }}
          >
            {fastButtonCaption}
          </Button>

          <Button
            className={cx('btn-white animation-view-btn', {
              'btn-active': animationSpeed === ANIMATION_SPEEDS.SINGLE_STEP,
            })}
            onClick={(): void => {
              onSpeedBtnClick(ANIMATION_SPEEDS.SINGLE_STEP, 0);
            }}
          >
            Single step
          </Button>
          <Button
            className="btn-white animation-view-btn"
            onClick={onPrevFrame}
            disabled={animationSpeed !== ANIMATION_SPEEDS.SINGLE_STEP}
          >
            Prev step
          </Button>
          <Button
            className="btn-white animation-view-btn"
            onClick={onNextFrame}
            disabled={animationSpeed !== ANIMATION_SPEEDS.SINGLE_STEP}
          >
            Next step
          </Button>
        </div>
      </div>

      <div className="controls-block change-mode">
        <div className="buttons-block">
          <Button className="btn-white animation-view-btn" onClick={onEdit}>
            {editButtonCaption}
          </Button>
          <Button className="btn-white animation-view-btn" onClick={onFinish}>
            {finishButtonCaption}
          </Button>
        </div>
      </div>
    </div>
  );
});
