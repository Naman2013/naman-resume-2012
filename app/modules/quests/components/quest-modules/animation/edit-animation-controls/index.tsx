import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';
import { IQuestAnimation } from 'app/modules/quests/types';

type EditAnimationControlsProps = {
  questAnimation: IQuestAnimation;
  xOffset: number;
  yOffset: number;
  zoom: number;
  moveLeftPress: () => void;
  moveLeftRelease: (mouseLeave?: boolean) => void;
  moveRigthPress: () => void;
  moveRigthRelease: (mouseLeave?: boolean) => void;
  moveDownPress: () => void;
  moveDownRelease: (mouseLeave?: boolean) => void;
  moveTopPress: () => void;
  moveTopRelease: (mouseLeave?: boolean) => void;
  zoomInCanvas: () => void;
  zoomOutCanvas: () => void;
  onPlay: () => void;
  onFinish: () => void;
  disabledZoom: boolean;
  disabledMove: boolean;
};

export const EditAnimationControls: React.FC<
  EditAnimationControlsProps
> = React.memo(props => {
  const {
    questAnimation,
    xOffset,
    yOffset,
    zoom,
    onPlay,
    moveLeftPress,
    moveLeftRelease,
    moveRigthPress,
    moveRigthRelease,
    moveDownPress,
    moveDownRelease,
    moveTopPress,
    moveTopRelease,
    zoomInCanvas,
    zoomOutCanvas,
    disabledZoom,
    disabledMove,
    onFinish,
  } = props;
  const {
    magnificationDefault,
    magnificationUnitsCaption,
    playButtonCaption,
    enablePlayButton,
    showPlayButton,
    showPlayButtonTooltip,
    playButtonTooltipText,
    showFinishButton,
    finishButtonTooltipText,
    showFinishButtonTooltip,
    enableFinishButton,
    finishButtonCaption,
  } = questAnimation;

  return (
    <div className="animation-controls edit-controls">
      <div className="controls-block">
        <div className="buttons-block">
          <Button
            className="btn-white move-btn move-btn-left"
            onTouchStart={moveLeftPress}
            onTouchEnd={(): void => {
              moveLeftRelease(false);
            }}
            onMouseDown={moveLeftPress}
            onMouseUp={(): void => {
              moveLeftRelease(false);
            }}
            onMouseLeave={(): void => {
              moveLeftRelease(true);
            }}
            disabled={disabledMove}
          >
            <div className="icon icon-slider-left" />
          </Button>
          <Button
            className="btn-white move-btn move-btn-right"
            onTouchStart={moveRigthPress}
            onTouchEnd={(): void => {
              moveRigthRelease(false);
            }}
            onMouseDown={moveRigthPress}
            onMouseUp={(): void => {
              moveRigthRelease(false);
            }}
            onMouseLeave={(): void => {
              moveRigthRelease(true);
            }}
            disabled={disabledMove}
          >
            <div className="icon icon-slider-right" />
          </Button>
        </div>
        <p>X: {xOffset}</p>
      </div>

      <div className="controls-block">
        <div className="buttons-block">
          <Button
            className="btn-white move-btn move-btn-up"
            onTouchStart={moveTopPress}
            onTouchEnd={(): void => {
              moveTopRelease(false);
            }}
            onMouseDown={moveTopPress}
            onMouseUp={(): void => {
              moveTopRelease(false);
            }}
            onMouseLeave={(): void => {
              moveTopRelease(true);
            }}
            disabled={disabledMove}
          >
            <div className="icon icon-slider-left" />
          </Button>
          <Button
            className="btn-white move-btn move-btn-down"
            onTouchStart={moveDownPress}
            onTouchEnd={(): void => {
              moveDownRelease(false);
            }}
            onMouseDown={moveDownPress}
            onMouseUp={(): void => {
              moveDownRelease(false);
            }}
            onMouseLeave={(): void => {
              moveDownRelease(true);
            }}
            disabled={disabledMove}
          >
            <div className="icon icon-slider-right" />
          </Button>
        </div>
        <p>Y: {yOffset}</p>
      </div>

      <div className="controls-block">
        <div className="buttons-block">
          <Button
            className="btn-white zoom-btn"
            onClick={zoomInCanvas}
            disabled={disabledZoom}
          >
            <div className="icon icon-plus" />
          </Button>
          <Button
            className="btn-white zoom-btn"
            onClick={zoomOutCanvas}
            disabled={disabledZoom}
          >
            <div className="icon icon-minus" />
          </Button>
        </div>
        <p>
          {zoom || magnificationDefault}
          {magnificationUnitsCaption}
        </p>
      </div>

      <div className="controls-block change-mode">
        {showPlayButton && (
          <Tooltip
            theme="dark"
            title={playButtonTooltipText}
            distance={10}
            position="top"
            disabled={!showPlayButtonTooltip}
          >
            <Button
              className="btn-white"
              onClick={onPlay}
              disabled={!enablePlayButton}
            >
              {playButtonCaption}
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
              className="btn-white animation-view-btn finish-btn"
              onClick={onFinish}
              disabled={!enableFinishButton}
            >
              {finishButtonCaption}
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
});
