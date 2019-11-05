import React from 'react';
import './styles.scss';

type QuestViewAnimationProps = {};

export const ViewAnimation: React.FC<QuestViewAnimationProps> = React.memo(
  props => {
    return (
      <div className="animation-box">
        fasdfas
        {/* <h6>{caption}</h6>
        <h4>{`${objectName} ${imageDate} ${imageTime}`}</h4>
        <div className="vertical-line" />
        <div
          id="animationCanvasContainer"
          ref={node => {
            this.canvasContainer = node;
          }}
        >
          <canvas id="animation-canvas" />
        </div> */}
        <div className="animation-controls">
          <div className="controls-block">
            {/* <div className="buttons-block">
              <Button
                className="move-btn move-btn-left"
                onTouchStart={this.moveLeftPress}
                onTouchEnd={this.moveLeftRelease}
                onMouseDown={this.moveLeftPress}
                onMouseUp={this.moveLeftRelease}
              >
                <div className="icon icon-slider-left" />
              </Button>
              <Button
                className="move-btn move-btn-right"
                onTouchStart={this.moveRigthPress}
                onTouchEnd={this.moveRigthRelease}
                onMouseDown={this.moveRigthPress}
                onMouseUp={this.moveRigthRelease}
              >
                <div className="icon icon-slider-right" />
              </Button>
            </div>
            <p>X: {xOffset}</p>
          </div>

          <div className="controls-block">
            <div className="buttons-block">
              <Button
                className="move-btn move-btn-up"
                onTouchStart={this.moveTopPress}
                onTouchEnd={this.moveTopRelease}
                onMouseDown={this.moveTopPress}
                onMouseUp={this.moveTopRelease}
              >
                <div className="icon icon-slider-left" />
              </Button>
              <Button
                className="move-btn move-btn-down"
                onTouchStart={this.moveDownPress}
                onTouchEnd={this.moveDownRelease}
                onMouseDown={this.moveDownPress}
                onMouseUp={this.moveDownRelease}
              >
                <div className="icon icon-slider-right" />
              </Button>
            </div>
            <p>Y: {yOffset}</p>
          </div>

          <div className="controls-block">
            <div className="buttons-block">
              <Button className="zoom-btn" onClick={this.zoomInCanvas}>
                <div className="icon icon-plus" />
              </Button>
              <Button className="zoom-btn" onClick={this.zoomOutCanvas}>
                <div className="icon icon-minus" />
              </Button>
            </div>
            <p>
              {zoom || magnificationDefault}
              {magnificationUnitsCaption}
            </p>
          </div>

          <div className="controls-block">
            <Button onClick={() => {}}>{playButtonCaption}</Button>
          </div> */}
          </div>
        </div>
      </div>
    );
  }
);
