import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import { IQuestAnimation } from 'app/modules/quests/types';

type PreviewAnimationControlsProps = {
  questAnimation: IQuestAnimation;
  onEdit: () => void;
  onFinish: () => void;
};

const ANIMATION_SPEEDS = {
  SLOW: 'SLOW',
  MED: 'MED',
  FAST: 'FAST',
};

export const PreviewAnimationControls: React.FC<
  PreviewAnimationControlsProps
> = React.memo(props => {
  const { questAnimation, onEdit, onFinish } = props;
  const {
    fastButtonCaption,
    mediumButtonCaption,
    slowButtonCaption,
    editButtonCaption,
    finishButtonCaption,
  } = questAnimation;

  const [animationSpeed, setAnimationSpeed] = useState(ANIMATION_SPEEDS.SLOW);

  return (
    <div className="animation-controls">
      <div className="controls-block">
        <div className="buttons-block">
          <Button
            className={cx('btn-white animation-view-btn', {
              'btn-active': animationSpeed === ANIMATION_SPEEDS.SLOW,
            })}
            onClick={(): void => setAnimationSpeed(ANIMATION_SPEEDS.SLOW)}
          >
            {slowButtonCaption}
          </Button>
          <Button
            className={cx('btn-white animation-view-btn', {
              'btn-active': animationSpeed === ANIMATION_SPEEDS.MED,
            })}
            onClick={(): void => setAnimationSpeed(ANIMATION_SPEEDS.MED)}
          >
            {mediumButtonCaption}
          </Button>
          <Button
            className={cx('btn-white animation-view-btn', {
              'btn-active': animationSpeed === ANIMATION_SPEEDS.FAST,
            })}
            onClick={(): void => setAnimationSpeed(ANIMATION_SPEEDS.FAST)}
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
