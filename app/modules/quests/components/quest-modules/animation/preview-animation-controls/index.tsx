import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';
import cx from 'classnames';
import { IQuestAnimation } from 'app/modules/quests/types';

type PreviewAnimationControlsProps = {
  questAnimation: IQuestAnimation;
  onEdit: () => void;
  onFinish: () => void;
  onSpeedChange: (speed: number, singleStep: boolean, type: string) => void;
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
    editButtonTooltipText,
    enableEditButton,
    enableFastButton,
    enableFinishButton,
    enableMediumButton,
    enableSlowButton,
    fastButtonTooltipText,
    finishButtonTooltipText,
    mediumButtonTooltipText,
    showEditButton,
    showEditButtonTooltip,
    showFastButton,
    showFastButtonTooltip,
    showFinishButton,
    showFinishButtonTooltip,
    showMediumButton,
    showMediumButtonTooltip,
    showSlowButton,
    showSlowButtonTooltip,
    slowButtonTooltipText,
  } = questAnimation;

  const [animationSpeed, setAnimationSpeed] = useState(ANIMATION_SPEEDS.SLOW);

  const onSpeedBtnClick = (type: string, speed: number): void => {
    setAnimationSpeed(type);
    onSpeedChange(speed, type === ANIMATION_SPEEDS.SINGLE_STEP, type);
  };

  return (
    <div className="animation-controls preview-controls">
      <div className="controls-block speed-actions">
        <div className="buttons-block">
          {showSlowButton && (
            <Tooltip
              theme="dark"
              title={slowButtonTooltipText}
              distance={10}
              position="top"
              disabled={!showSlowButtonTooltip}
            >
              <Button
                className={cx('btn-white animation-view-btn', {
                  'btn-active': animationSpeed === ANIMATION_SPEEDS.SLOW,
                })}
                onClick={(): void => {
                  onSpeedBtnClick(ANIMATION_SPEEDS.SLOW, previewDelaySlow);
                }}
                disabled={!enableSlowButton}
              >
                {slowButtonCaption}
              </Button>
            </Tooltip>
          )}
          {showMediumButton && (
            <Tooltip
              theme="dark"
              title={mediumButtonTooltipText}
              distance={10}
              position="top"
              disabled={!showMediumButtonTooltip}
            >
              <Button
                className={cx('btn-white animation-view-btn', {
                  'btn-active': animationSpeed === ANIMATION_SPEEDS.MED,
                })}
                onClick={(): void => {
                  onSpeedBtnClick(ANIMATION_SPEEDS.MED, previewDelayMedium);
                }}
                disabled={!enableMediumButton}
              >
                {mediumButtonCaption}
              </Button>
            </Tooltip>
          )}
          {showFastButton && (
            <Tooltip
              theme="dark"
              title={fastButtonTooltipText}
              distance={10}
              position="top"
              disabled={!showFastButtonTooltip}
            >
              <Button
                className={cx('btn-white animation-view-btn', {
                  'btn-active': animationSpeed === ANIMATION_SPEEDS.FAST,
                })}
                onClick={(): void => {
                  onSpeedBtnClick(ANIMATION_SPEEDS.FAST, previewDelayFast);
                }}
                disabled={!enableFastButton}
              >
                {fastButtonCaption}
              </Button>
            </Tooltip>
          )}

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
          {showEditButton && (
            <Tooltip
              theme="dark"
              title={editButtonTooltipText}
              distance={10}
              position="top"
              disabled={!showEditButtonTooltip}
            >
              <Button
                className="btn-white animation-view-btn"
                onClick={onEdit}
                disabled={!enableEditButton}
              >
                {editButtonCaption}
              </Button>
            </Tooltip>
          )}
          {showFinishButton && (
            <Tooltip
              theme="dark"
              title={finishButtonTooltipText}
              distance={10}
              position="top"
              disabled={!showFinishButtonTooltip}
            >
              <Button
                className="btn-white animation-view-btn"
                onClick={onFinish}
                disabled={!enableFinishButton}
              >
                {finishButtonCaption}
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
});
