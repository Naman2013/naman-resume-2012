import React, { RefObject } from 'react';
import { fabric } from 'fabric';
import { Button } from 'react-bootstrap';
import {
  IQuestStepModule,
  IQuestAnimation,
  IQuestAnimationFrames,
  IAnimationFrame,
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
};

type AnimationModuleState = {};

export class AnimationModule extends React.PureComponent<
  AnimationModuleProps,
  AnimationModuleState
> {
  canvas: any;

  canvasContainer: HTMLDivElement;

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
    const { magnificationDefault } = questAnimation;

    const imgAttrs = {
      centeredScaling: false,
      crossOrigin: 'anonymous',
      selectable: false,
      hoverCursor: 'auto',
      left: xOffset,
      top: -yOffset,
      opacity: frameIndex > 1 ? 0.5 : 1,
      originX: offsetReference === 'center' ? offsetReference : 'left',
      originY: offsetReference === 'center' ? offsetReference : 'top',
      scaleX: magnificationDefault / 100,
      scaleY: magnificationDefault / 100,
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

  moveTop = (): void => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { yOffsetMax, yOffsetLargeStep } = questAnimation;
    const item = this.getActiveCanvasItem();
    const newOffset = -item.get('top') + yOffsetLargeStep;
    const yOffset = newOffset < yOffsetMax ? newOffset : yOffsetMax;

    item.set({ top: -yOffset });
    this.canvas.renderAll();
    setActiveFrame({ ...activeFrame, yOffset });
  };

  moveDown = (): void => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { yOffsetMin, yOffsetLargeStep } = questAnimation;
    const item = this.getActiveCanvasItem();
    const newOffset = -item.get('top') - yOffsetLargeStep;
    const yOffset = newOffset > yOffsetMin ? newOffset : yOffsetMin;

    item.set({ top: -yOffset });
    this.canvas.renderAll();
    setActiveFrame({ ...activeFrame, yOffset });
  };

  moveLeft = (): void => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { xOffsetMin, xOffsetLargeStep } = questAnimation;
    const item = this.getActiveCanvasItem();
    const newOffset = item.get('left') - xOffsetLargeStep;
    const xOffset = newOffset > xOffsetMin ? newOffset : xOffsetMin;

    item.set({ left: xOffset });
    this.canvas.renderAll();
    setActiveFrame({ ...activeFrame, xOffset });
  };

  moveRigth = (): void => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { xOffsetMax, xOffsetLargeStep } = questAnimation;
    const item = this.getActiveCanvasItem();
    const newOffset = item.get('left') + xOffsetLargeStep;
    const xOffset = newOffset < xOffsetMax ? newOffset : xOffsetMax;

    item.set({ left: xOffset });
    this.canvas.renderAll();
    setActiveFrame({ ...activeFrame, xOffset });
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

  onPageRezise = (): void => {
    const canvasContainerWidth = this.canvasContainer.getBoundingClientRect()
      .width;

    this.canvas.setWidth(canvasContainerWidth - 2); // 2px border
    this.canvas.setHeight(canvasContainerWidth - 2); // 2px border
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
      getAnimation({ questId, questUUID, moduleId, moduleUUID });
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

  setActiveFrame = (frame: IAnimationFrame) => {
    const { setActiveFrame, activeFrame } = this.props;
    const { frameIndex } = activeFrame;

    if (frameIndex !== 1) {
      this.canvas.item(frameIndex - 1).set({ visible: false });
    }

    this.canvas.item(frame.frameIndex - 1).set({ visible: true });
    this.canvas.renderAll();

    setActiveFrame(frame);
  };

  render() {
    const { activeFrame, questAnimation, questAnimationFrames } = this.props;
    const { caption, infoArray, xOffset, yOffset, scale } = activeFrame;
    const { objectName, imageDate, imageTime } = infoArray;
    const { magnificationUnitsCaption, magnificationDefault } = questAnimation;
    const { frameList } = questAnimationFrames;

    console.log('activeFrame', activeFrame);
    return (
      <div className="animation-module">
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
                <Button
                  className="move-btn move-btn-left"
                  onClick={this.moveLeft}
                >
                  <div className="icon icon-slider-left" />
                </Button>
                <Button
                  className="move-btn move-btn-right"
                  onClick={this.moveRigth}
                >
                  <div className="icon icon-slider-right" />
                </Button>
              </div>
              <p>X: {xOffset}</p>
            </div>

            <div className="controls-block">
              <div className="buttons-block">
                <Button className="move-btn move-btn-up" onClick={this.moveTop}>
                  <div className="icon icon-slider-left" />
                </Button>
                <Button
                  className="move-btn move-btn-down"
                  onClick={this.moveDown}
                >
                  <div className="icon icon-slider-right" />
                </Button>
              </div>
              <p>Y: {yOffset}</p>
            </div>

            <div className="controls-block">
              <div className="buttons-block">
                <Button className="zoom-btn" onClick={this.zoomIn}>
                  <div className="icon icon-plus" />
                </Button>
                <Button className="zoom-btn" onClick={this.zoomOut}>
                  <div className="icon icon-minus" />
                </Button>
              </div>
              <p>
                {scale || magnificationDefault}
                {magnificationUnitsCaption}
              </p>
            </div>

            <div className="controls-block">
              <Button onClick={() => {}}>Play</Button>
            </div>
          </div>
        </div>

        <FrameList
          frameList={frameList}
          activeFrame={activeFrame}
          setActiveFrame={this.setActiveFrame}
        />

        <br />
        <Button onClick={() => console.log(JSON.stringify(this.canvas))}>
          get json
        </Button>
        <Button onClick={() => console.log(this.canvas.getObjects())}>
          get objects
        </Button>
      </div>
    );
  }
}
