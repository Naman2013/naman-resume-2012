import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import { IQuestAnimation } from 'app/modules/quests/types';

type PreviewAnimationControlsProps = {
  questAnimation: IQuestAnimation;
  onEdit: () => void;
  onFinish: () => void;
  onSpeedChange: (speed: number) => void;
};

const ANIMATION_SPEEDS = {
  SLOW: 'SLOW',
  MED: 'MED',
  FAST: 'FAST',
};

export const PreviewAnimationControls: React.FC<
  PreviewAnimationControlsProps
> = React.memo(props => {
  const { questAnimation, onEdit, onFinish, onSpeedChange } = props;
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
    onSpeedChange(speed);
  };

  return (
    <div className="animation-controls">
      <div className="controls-block">
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
        </div>
      </div>

      <div className="controls-block">
        <div className="buttons-block">
          <Button className="btn-white animation-view-btn" onClick={onEdit}>
            {editButtonCaption}
          </Button>
        </div>
      </div>

      <div className="controls-block">
        <Button className="btn-white animation-view-btn" onClick={onFinish}>
          {finishButtonCaption}
        </Button>
      </div>
    </div>
  );
});
