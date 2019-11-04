import React, { RefObject } from 'react';
import { fabric } from 'fabric';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import {
  IQuestStepModule,
  IQuestAnimation,
  IQuestAnimationFrames,
  IAnimationFrame,
  IQuestAnimationData,
} from 'app/modules/quests/types';
import { FrameList } from './frame-list';
import './styles.scss';

type AnimationModuleProps = {
  module: IQuestStepModule;
  readOnly: boolean;
  routeParams: any;
  navigateToNextStep: Function;
  refreshQuestStep: Function;
  getAnimation: Function;
  getAnimationFrames: Function;
  stepData: any;
  questId: string;
  activeFrame: any;
  setActiveFrame: Function;
  questAnimation: IQuestAnimation;
  questAnimationFrames: IQuestAnimationFrames;
  setAnimation: Function;
  setAnimationData: Function;
  questAnimationData: IQuestAnimationData;
};

type AnimationModuleState = {
  activeAnimationStep: string;
};

const ANIMATION_STEPS = {
  EDIT: 'EDIT',
  PLAY: 'PLAY',
  COMPLETED: 'COMPLETED',
};

export class AnimationModule extends React.PureComponent<
  AnimationModuleProps,
  AnimationModuleState
> {
  canvas: any;

  canvasContainer: HTMLDivElement;

  moveButtonPressTimer: ReturnType<typeof setTimeout>;

  moveButtonPressInterval: ReturnType<typeof setInterval>;

  state = {
    activeAnimationStep: ANIMATION_STEPS.EDIT,
  };

  componentDidMount(): void {
    this.initCanvas();
    this.getAnimation();
    this.getAnimationFrames();
    window.addEventListener('resize', this.onPageRezise);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.onPageRezise);
  }

  initCanvas = (): void => {
    this.canvas = new fabric.Canvas('c');
    this.canvas.selection = false; // disable group selection
    this.onPageRezise();
  };

  initFramesImages = (frameList: Array<IAnimationFrame>): void => {
    this.loadImageFromUrl(0, frameList);
    this.canvas.renderAll();
  };

  loadImageFromUrl = (
    frameIndexToLoad: number,
    frameList: Array<IAnimationFrame>
  ) => {
    const {
      frameIndex,
      imageURL,
      xOffset,
      yOffset,
      offsetReference,
    } = frameList[frameIndexToLoad];
    const { questAnimation } = this.props;
    //const { magnificationDefault } = questAnimation;

    const imgAttrs = {
      centeredScaling: offsetReference === 'center',
      crossOrigin: 'anonymous',
      selectable: false,
      hoverCursor: 'auto',
      left: xOffset,
      top: -yOffset,
      opacity: frameIndex > 1 ? 0.5 : 1,
      originX: offsetReference === 'center' ? offsetReference : 'left',
      originY: offsetReference === 'center' ? offsetReference : 'top',
      // scaleX: magnificationDefault / 100,
      // scaleY: magnificationDefault / 100,
      visible: !(frameIndex > 1),
    };

    fabric.Image.fromURL(
      imageURL,
      (img: any): void => {
        // add image onto canvas (it also re-render the canvas)
        this.canvas.add(img);

        if (frameIndexToLoad + 1 < frameList.length) {
          this.loadImageFromUrl(frameIndexToLoad + 1, frameList);
        }
      },
      imgAttrs
    );
  };

  moveTop = (stepSize: number): IAnimationFrame => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { yOffsetMax } = questAnimation;
    const item = this.getActiveCanvasItem();
    const newOffset = -item.get('top') + stepSize;
    const yOffset = newOffset < yOffsetMax ? newOffset : yOffsetMax;

    item.set({ top: -yOffset });
    this.canvas.renderAll();
    const newFrame = { ...activeFrame, yOffset };
    setActiveFrame(newFrame);
    return newFrame;
  };

  moveTopPress = (): void => {
    const { questAnimation } = this.props;
    const { yOffsetLargeStep } = questAnimation;
    this.moveButtonPressTimer = setTimeout(() => {
      this.moveButtonPressInterval = setInterval(
        () => this.moveTop(yOffsetLargeStep),
        100
      );
    }, 300);
  };

  moveTopRelease = (): void => {
    const { questAnimation } = this.props;
    const { yOffsetSmallStep } = questAnimation;
    clearTimeout(this.moveButtonPressTimer);
    clearInterval(this.moveButtonPressInterval);
    const frame = this.moveTop(yOffsetSmallStep);
    this.setAnimation(frame);
  };

  moveDown = (stepSize: number): IAnimationFrame => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { yOffsetMin } = questAnimation;
    const item = this.getActiveCanvasItem();
    const newOffset = -item.get('top') - stepSize;
    const yOffset = newOffset > yOffsetMin ? newOffset : yOffsetMin;

    item.set({ top: -yOffset });
    this.canvas.renderAll();
    const newFrame = { ...activeFrame, yOffset };
    setActiveFrame(newFrame);
    return newFrame;
  };

  moveDownPress = (): void => {
    const { questAnimation } = this.props;
    const { yOffsetLargeStep } = questAnimation;
    this.moveButtonPressTimer = setTimeout(() => {
      this.moveButtonPressInterval = setInterval(
        () => this.moveDown(yOffsetLargeStep),
        100
      );
    }, 300);
  };

  moveDownRelease = (): void => {
    const { questAnimation } = this.props;
    const { yOffsetSmallStep } = questAnimation;
    clearTimeout(this.moveButtonPressTimer);
    clearInterval(this.moveButtonPressInterval);
    const frame = this.moveDown(yOffsetSmallStep);
    this.setAnimation(frame);
  };

  moveLeft = (stepSize: number): IAnimationFrame => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { xOffsetMin } = questAnimation;
    const item = this.getActiveCanvasItem();
    const newOffset = item.get('left') - stepSize;
    const xOffset = newOffset > xOffsetMin ? newOffset : xOffsetMin;

    item.set({ left: xOffset });
    this.canvas.renderAll();
    const newFrame = { ...activeFrame, xOffset };
    setActiveFrame(newFrame);
    return newFrame;
  };

  moveLeftPress = (): void => {
    const { questAnimation } = this.props;
    const { xOffsetLargeStep } = questAnimation;
    this.moveButtonPressTimer = setTimeout(() => {
      this.moveButtonPressInterval = setInterval(
        () => this.moveLeft(xOffsetLargeStep),
        100
      );
    }, 300);
  };

  moveLeftRelease = (): void => {
    const { questAnimation } = this.props;
    const { xOffsetSmallStep } = questAnimation;
    clearTimeout(this.moveButtonPressTimer);
    clearInterval(this.moveButtonPressInterval);
    const frame = this.moveLeft(xOffsetSmallStep);
    this.setAnimation(frame);
  };

  moveRigth = (stepSize: number): IAnimationFrame => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { xOffsetMax } = questAnimation;
    const item = this.getActiveCanvasItem();
    const newOffset = item.get('left') + stepSize;
    const xOffset = newOffset < xOffsetMax ? newOffset : xOffsetMax;

    item.set({ left: xOffset });
    this.canvas.renderAll();
    const newFrame = { ...activeFrame, xOffset };
    setActiveFrame(newFrame);
    return newFrame;
  };

  moveRigthPress = (): void => {
    const { questAnimation } = this.props;
    const { xOffsetLargeStep } = questAnimation;
    this.moveButtonPressTimer = setTimeout(() => {
      this.moveButtonPressInterval = setInterval(
        () => this.moveRigth(xOffsetLargeStep),
        100
      );
    }, 300);
  };

  moveRigthRelease = (): void => {
    const { questAnimation } = this.props;
    const { xOffsetSmallStep } = questAnimation;
    clearTimeout(this.moveButtonPressTimer);
    clearInterval(this.moveButtonPressInterval);
    const frame = this.moveRigth(xOffsetSmallStep);
    this.setAnimation(frame);
  };

  zoomIn = (): void => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { magnificationMax, magnificationStep } = questAnimation;
    const item = this.getActiveCanvasItem();
    let scale = item.get('scaleX') + magnificationStep / 100;

    if (scale * 100 >= magnificationMax) {
      scale = magnificationMax / 100;
    }

    scale = Math.round(scale * 10) / 10;
    item.scale(scale);

    this.canvas.renderAll();
    setActiveFrame({ ...activeFrame, scale: Math.round(scale * 100) });
  };

  zoomOut = (): void => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { magnificationMin, magnificationStep } = questAnimation;
    const item = this.getActiveCanvasItem();
    let scale = item.get('scaleX') - magnificationStep / 100;

    if (scale * 100 <= magnificationMin) {
      scale = magnificationMin / 100;
    }

    scale = Math.round(scale * 10) / 10;
    item.scale(scale);
    this.canvas.renderAll();
    setActiveFrame({ ...activeFrame, scale: Math.round(scale * 100) });
  };

  zoomInCanvas = (): void => {
    const { questAnimation, setAnimationData } = this.props;
    const { magnificationMax, magnificationStep } = questAnimation;
    let newZoom = this.canvas.getZoom() + magnificationStep / 100;

    if (newZoom * 100 >= magnificationMax) {
      newZoom = magnificationMax / 100;
    }

    newZoom = Math.round(newZoom * 10) / 10;
    this.canvas.setZoom(newZoom).renderAll();
    setAnimationData({ zoom: Math.round(newZoom * 100) });
  };

  zoomOutCanvas = (): void => {
    const { questAnimation, setAnimationData } = this.props;
    const { magnificationMin, magnificationStep } = questAnimation;

    let newZoom = this.canvas.getZoom() - magnificationStep / 100;

    if (newZoom * 100 <= magnificationMin) {
      newZoom = magnificationMin / 100;
    }

    newZoom = Math.round(newZoom * 10) / 10;
    this.canvas.setZoom(newZoom).renderAll();
    setAnimationData({ zoom: Math.round(newZoom * 100) });
  };

  onPageRezise = (): void => {
    const canvasContainerWidth = this.canvasContainer.getBoundingClientRect()
      .width;

    this.canvas.setWidth(canvasContainerWidth - 2); // 2px border
    this.canvas.setHeight(canvasContainerWidth - 2); // 2px border
    this.canvas.renderAll();
  };

  getActiveCanvasItem = (): any => {
    const { activeFrame } = this.props;
    const { frameIndex } = activeFrame;
    return this.canvas.item(frameIndex - 1);
  };

  getAnimation = (): void => {
    const { module, questId, stepData, getAnimation } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;
    if (questId && moduleId) {
      getAnimation({ questId, questUUID, moduleId, moduleUUID }).then(
        ({ payload }: any): void =>
          this.canvas.setZoom(payload.magnificationDefault / 100)
      );
    }
  };

  getAnimationFrames = (): void => {
    const { module, questId, stepData, getAnimationFrames } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;
    if (questId && moduleId) {
      getAnimationFrames({ questId, questUUID, moduleId, moduleUUID }).then(
        ({ payload }: any): void => this.initFramesImages(payload.frameList)
      );
    }
  };

  setActiveFrame = (frame: IAnimationFrame): void => {
    const { setActiveFrame, activeFrame } = this.props;
    const { frameIndex } = activeFrame;

    if (frameIndex !== 1) {
      this.canvas.item(frameIndex - 1).set({ visible: false });
    }

    this.canvas.item(frame.frameIndex - 1).set({ visible: true });
    this.canvas.renderAll();

    setActiveFrame(frame);
  };

  setAnimation = (frame: IAnimationFrame): void => {
    const { setAnimation, module, questId } = this.props;
    const { moduleId } = module;
    const { offsetReference, frameIndex, xOffset, yOffset } = frame;

    const data = {
      questId,
      moduleId,
      requestType: 'frame',
      action: 'submit',
      frameIndex,
      xOffset,
      yOffset,
      offsetReference,
      serializedFramesAll: JSON.stringify(this.canvas),
    };
    setAnimation(data);
  };

  render() {
    const {
      activeFrame,
      questAnimation,
      questAnimationFrames,
      questAnimationData,
    } = this.props;
    const { activeAnimationStep } = this.state;
    const { caption, infoArray, xOffset, yOffset } = activeFrame;
    const { zoom } = questAnimationData;
    const { objectName, imageDate, imageTime } = infoArray;
    const {
      magnificationUnitsCaption,
      magnificationDefault,
      playButtonCaption,
    } = questAnimation;
    const { frameList } = questAnimationFrames;

    const moveBtnEvents = {
      onTouchStart: this.moveDownPress,
      onTouchEnd: this.moveDownRelease,
      onMouseDown: this.moveDownPress,
      onMouseUp: this.moveDownRelease,
    };

    return (
      <div className="animation-module">
        <div
          className={cx('animation-edit', {
            visible: activeAnimationStep === ANIMATION_STEPS.EDIT,
          })}
        >
          <div className="animation-box">
            <h6>{caption}</h6>
            <h4>{`${objectName} ${imageDate} ${imageTime}`}</h4>
            <div className="vertical-line" />
            <div
              id="animationCanvasContainer"
              ref={node => {
                this.canvasContainer = node;
              }}
            >
              <canvas id="c" />
            </div>

            <div className="animation-controls">
              <div className="controls-block">
                <div className="buttons-block">
                  <Button className="move-btn move-btn-left" {...moveBtnEvents}>
                    <div className="icon icon-slider-left" />
                  </Button>
                  <Button
                    className="move-btn move-btn-right"
                    {...moveBtnEvents}
                  >
                    <div className="icon icon-slider-right" />
                  </Button>
                </div>
                <p>X: {xOffset}</p>
              </div>

              <div className="controls-block">
                <div className="buttons-block">
                  <Button className="move-btn move-btn-up" {...moveBtnEvents}>
                    <div className="icon icon-slider-left" />
                  </Button>
                  <Button className="move-btn move-btn-down" {...moveBtnEvents}>
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
              </div>
            </div>
          </div>

          <FrameList
            frameList={frameList}
            activeFrame={activeFrame}
            setActiveFrame={this.setActiveFrame}
          />
        </div>
      </div>
    );
  }
}
