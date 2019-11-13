import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import { IQuestAnimation } from 'app/modules/quests/types';

type EditAnimationControlsProps = {
  questAnimation: IQuestAnimation;
  xOffset: number;
  yOffset: number;
  zoom: number;
  moveLeftPress: () => void;
  moveLeftRelease: () => void;
  moveRigthPress: () => void;
  moveRigthRelease: () => void;
  moveDownPress: () => void;
  moveDownRelease: () => void;
  moveTopPress: () => void;
  moveTopRelease: () => void;
  zoomInCanvas: () => void;
  zoomOutCanvas: () => void;
  onPlay: () => void;
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
  } = props;
  const {
    magnificationDefault,
    magnificationUnitsCaption,
    playButtonCaption,
  } = questAnimation;

  return (
    <div className="animation-controls">
      <div className="controls-block">
        <div className="buttons-block">
          <Button
            className="btn-white move-btn move-btn-left"
            onTouchStart={moveLeftPress}
            onTouchEnd={moveLeftRelease}
            onMouseDown={moveLeftPress}
            onMouseUp={moveLeftRelease}
            disabled={disabledMove}
          >
            <div className="icon icon-slider-left" />
          </Button>
          <Button
            className="btn-white move-btn move-btn-right"
            onTouchStart={moveRigthPress}
            onTouchEnd={moveRigthRelease}
            onMouseDown={moveRigthPress}
            onMouseUp={moveRigthRelease}
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
            className="btn-white move-btn move-btn-down"
            onTouchStart={moveDownPress}
            onTouchEnd={moveDownRelease}
            onMouseDown={moveDownPress}
            onMouseUp={moveDownRelease}
            disabled={disabledMove}
          >
            <div className="icon icon-slider-right" />
          </Button>
          <Button
            className="btn-white move-btn move-btn-up"
            onTouchStart={moveTopPress}
            onTouchEnd={moveTopRelease}
            onMouseDown={moveTopPress}
            onMouseUp={moveTopRelease}
            disabled={disabledMove}
          >
            <div className="icon icon-slider-left" />
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

      <div className="controls-block">
        <Button className="btn-white" onClick={onPlay}>
          {playButtonCaption}
        </Button>
      </div>
    </div>
  );
});
