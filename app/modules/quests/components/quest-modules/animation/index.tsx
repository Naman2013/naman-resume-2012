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
    const canvasContainerWidth = this.canvasContainer.getBoundingClientRect()
      .width;

    frameList.reverse().map(
      (frame: IAnimationFrame): IAnimationFrame => {
        const { frameIndex, imageURL, xOffset, yOffset } = frame;

        const imgAttrs = {
          crossOrigin: 'anonymous',
          selectable: false,
          cursor: 'auto',
          left: xOffset,
          top: yOffset,
          opacity: frameIndex > 1 ? 0.5 : 1,
          visible: !(frameIndex > 1),
        };

        fabric.Image.fromURL(
          imageURL,
          (img: any): void => {
            // add image onto canvas (it also re-render the canvas)

            img.scaleToWidth(canvasContainerWidth - 2); // 2px border
            this.canvas.add(img).centerObject(img);
            //.renderAll();
            //img.setCoords();
          },
          imgAttrs
        );

        return frame;
      }
    );

    this.canvas.renderAll();
  };

  loadImageFromUrl = () => {};

  moveTop = (): void => {
    const item = this.canvas.item(0);
    item.set({ top: item.get('top') - 10 });
    this.canvas.renderAll();
  };

  moveDown = (): void => {
    const item = this.canvas.item(0);
    item.set({ top: item.get('top') + 10 });
    this.canvas.renderAll();
  };

  moveLeft = (): void => {
    const item = this.canvas.item(0);
    item.set({ left: item.get('left') - 10 });
    this.canvas.renderAll();
  };

  moveRigth = (): void => {
    const item = this.canvas.item(0);
    item.set({ left: item.get('left') + 10 });
    this.canvas.renderAll();
  };

  zoomIn = (): void => {
    //const item = this.canvas;
    const item = this.canvas.item(0);
    item.scale(0.75);
    this.canvas.renderAll();
    //const zoom = item.scale(1 + 0.1);
    // zoom = zoom + 1;
    // if (zoom < 1) zoom = 1;
    //item.setZoom(zoom);
  };

  zoomOut = (): void => {
    // const item = this.canvas;
    // const zoom = item.getZoom() - 0.1;
    // // zoom = zoom + 1;
    // // if (zoom < 1) zoom = 1;
    // item.setZoom(zoom);
    const item = this.canvas.item(0);
    item.scale(0.25);
    this.canvas.renderAll();
  };

  onPageRezise = (): void => {
    const canvasContainerWidth = this.canvasContainer.getBoundingClientRect()
      .width;

    this.canvas.setWidth(canvasContainerWidth - 2); // 2px border
    this.canvas.setHeight(canvasContainerWidth - 2); // 2px border
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
        ({ payload }: any): void =>
          this.initFramesImages([...payload.frameList])
      );
    }
  };

  setActiveFrame = (frame: IAnimationFrame) => {
    const { setActiveFrame, activeFrame } = this.props;
    const { frameIndex } = activeFrame;
    console.log(frameIndex, frame.frameIndex);
    if (frameIndex !== 1) {
      this.canvas.item(frameIndex - 1).set({ visible: false });
    }

    this.canvas.item(frame.frameIndex - 1).set({ visible: true });
    this.canvas.renderAll();

    setActiveFrame(frame);
  };

  render() {
    const { activeFrame, questAnimation, questAnimationFrames } = this.props;
    const { caption, infoArray } = activeFrame;
    const { objectName, imageDate, imageTime } = infoArray;
    const { magnificationUnitsCaption } = questAnimation;
    const { frameList } = questAnimationFrames;

    console.log('activeFrame', frameList);
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
              <p>X - 0000</p>
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
              <p>Y - 0000</p>
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
              <p>100{magnificationUnitsCaption}</p>
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
