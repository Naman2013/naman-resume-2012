import React from 'react';
import { fabric } from 'fabric';
import cx from 'classnames';
import {
  IQuestStepModule,
  IQuestAnimation,
  IAnimationFrame,
  IQuestAnimationData,
  IQuestAnimationFrames,
} from 'app/modules/quests/types';
import { FrameList } from './frame-list';
import { EditAnimationControls } from './edit-animation-controls';
import { PreviewAnimationControls } from './preview-animation-controls';
import { QuestStepModuleHeader } from '../../quest-step-module-header';
import { AnimationCompleted } from './animation-completed';
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
  activePreviewImage: number;
  previewFrameList: Array<IAnimationFrame>;
  previewSingleStep: boolean;
};

const ANIMATION_STEPS = {
  EDIT: 'EDIT',
  PLAY: 'PLAY',
  COMPLETED: 'COMPLETED',
};

const BUTTON_TYPES: { [key: string]: string } = {
  EDIT: 'edit',
  PLAY: 'play',
  FINISH: 'finish',
  SLOW: 'slow',
  MED: 'med',
  FAST: 'fast',
};

const CANVAS_DEFAULT_WIDTH = 414;

export class AnimationModule extends React.PureComponent<
  AnimationModuleProps,
  AnimationModuleState
> {
  canvas: any;

  canvasContainer: HTMLDivElement;

  moveButtonPressTimer: ReturnType<typeof setTimeout>;

  moveButtonPressInterval: ReturnType<typeof setInterval>;

  previewAnimationInterval: ReturnType<typeof setInterval>;

  isDragging: boolean;

  lastPosX: number;

  lastPosY: number;

  vpt: Array<number>;

  state = {
    activeAnimationStep: ANIMATION_STEPS.EDIT,
    activePreviewImage: 0,
    previewFrameList: [{} as IAnimationFrame],
    previewSingleStep: false,
  };

  componentDidMount(): void {
    this.initCanvas();
    this.getAnimation();
    this.getAnimationFrames();
    window.addEventListener('resize', () => this.onPageRezise());
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', () => this.onPageRezise());
  }

  initCanvas = (): void => {
    this.canvas = new fabric.Canvas('animation-canvas');
    this.canvas.selection = false; // disable group selection
    this.canvas.hoverCursor = 'auto';
    this.vpt = [...this.canvas.viewportTransform];
    this.onPageRezise(false);

    this.initCanvasPan();
  };

  initCanvasPan = (): void => {
    this.canvas.on('mouse:down', ({ e }: any): void => {
      // set dragging true
      const { activeFrame } = this.props;
      const { empty } = activeFrame;
      if (!empty) {
        this.isDragging = true;
        this.lastPosX = e.clientX || e.changedTouches[0].clientX;
        this.lastPosY = e.clientY || e.changedTouches[0].clientY;
      }
    });

    this.canvas.on('mouse:move', ({ e }: any): void => {
      if (this.isDragging) {
        const evt = e.type === 'mousemove' ? e : e.changedTouches[0];

        // calculate dragging to true
        this.vpt = [...this.canvas.viewportTransform];
        this.vpt[4] += evt.clientX - this.lastPosX;
        this.vpt[5] += evt.clientY - this.lastPosY;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
        this.canvas.viewportTransform = [...this.vpt];

        this.updatePan();
      }
    });

    this.canvas.on('mouse:up', (e: any): void => {
      const { activeFrame } = this.props;
      this.isDragging = false;
      if (this.canvas.getZoom() > 1) {
        this.setAnimation(activeFrame);
      }
    });
  };

  initFramesImages = (frameList: Array<IAnimationFrame>): void => {
    this.loadImageFromUrl(0, frameList);
    this.canvas.renderAll();
    this.onPageRezise(false);
  };

  updatePan = (): void => {
    const zoom = this.canvas.getZoom();
    const containerWidth =
      this.canvasContainer.getBoundingClientRect().width - 2;

    const rightEdge = this.canvas.getWidth() - containerWidth * zoom;
    const bottomEdge = this.canvas.getHeight() - containerWidth * zoom;

    // check if end of the canvas
    if (this.vpt[4] >= 0) {
      this.canvas.viewportTransform[4] = 0;
      this.vpt[4] = 0;
    } else if (this.vpt[4] < rightEdge) {
      this.canvas.viewportTransform[4] = rightEdge;
      this.vpt[4] = rightEdge;
    }

    if (this.vpt[5] >= 0) {
      this.canvas.viewportTransform[5] = 0;
      this.vpt[5] = 0;
    } else if (this.vpt[5] < bottomEdge) {
      this.canvas.viewportTransform[5] = bottomEdge;
      this.vpt[5] = bottomEdge;
    }

    this.canvas.renderAll();
  };

  loadImageFromUrl = (
    frameIndexToLoad: number,
    frameList: Array<IAnimationFrame>
  ): void => {
    const { frameIndex, imageURL, xOffset, yOffset, empty } = frameList[
      frameIndexToLoad
    ];
    const { questAnimation } = this.props;
    const { offsetReference } = questAnimation;

    const imgAttrs = {
      centeredScaling: offsetReference !== 'center',
      crossOrigin: 'anonymous',
      selectable: false,
      //hoverCursor: 'auto',
      left: empty ? 0 : xOffset,
      top: empty ? 0 : -yOffset,
      opacity: frameIndex > 1 && !empty ? 0.5 : 1,
      originX:
        offsetReference === 'center' && !empty ? offsetReference : 'left',
      originY: offsetReference === 'center' && !empty ? offsetReference : 'top',
      visible: !(frameIndex > 1),
    };

    fabric.util.loadImage(imageURL, (img: any): void => {
      //load image to fabric
      const fabricImage = new fabric.Image(img, imgAttrs);
      //scale to canvas width
      fabricImage.scaleToWidth(this.canvas.getWidth());
      //then add it to canvas
      this.canvas.add(fabricImage);
      this.canvas.renderAll();

      //if doesn't end of frame list -> load next image
      if (frameIndexToLoad + 1 < frameList.length) {
        this.loadImageFromUrl(frameIndexToLoad + 1, frameList);
      }
    });
  };

  moveTop = (stepSize: number): IAnimationFrame => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { yOffsetMax } = questAnimation;
    const newCanvasContainerWidth =
      this.canvasContainer.getBoundingClientRect().width - 2;

    const item = this.getActiveCanvasItem();
    const offsetCoeff = newCanvasContainerWidth / item.get('width');
    const newOffset = activeFrame.yOffset + stepSize;
    const yOffset = newOffset < yOffsetMax ? newOffset : yOffsetMax;
    item.set({ top: -yOffset * offsetCoeff });
    this.canvas.renderAll();
    const newFrame = { ...activeFrame, yOffset };
    setActiveFrame(newFrame);
    return newFrame;
  };

  moveTopPress = (): void => {
    const { questAnimation } = this.props;
    const {
      yOffsetLargeStep,
      largeStepDelay,
      largeStepRepeat,
    } = questAnimation;
    this.moveButtonPressTimer = setTimeout(() => {
      this.moveButtonPressInterval = setInterval(
        () => this.moveTop(yOffsetLargeStep),
        largeStepRepeat
      );
    }, largeStepDelay);
  };

  moveTopRelease = (mouseLeave: boolean): void => {
    const { questAnimation } = this.props;
    const { yOffsetSmallStep } = questAnimation;
    clearTimeout(this.moveButtonPressTimer);
    clearInterval(this.moveButtonPressInterval);
    if (!mouseLeave) {
      const frame = this.moveTop(yOffsetSmallStep);
      this.setAnimation(frame);
    }
  };

  moveDown = (stepSize: number): IAnimationFrame => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { yOffsetMin } = questAnimation;
    const newCanvasContainerWidth =
      this.canvasContainer.getBoundingClientRect().width - 2;

    const item = this.getActiveCanvasItem();
    const offsetCoeff = newCanvasContainerWidth / item.get('width');
    const newOffset = activeFrame.yOffset - stepSize;
    const yOffset = newOffset > yOffsetMin ? newOffset : yOffsetMin;

    item.set({ top: -yOffset * offsetCoeff });
    this.canvas.renderAll();
    const newFrame = { ...activeFrame, yOffset };
    setActiveFrame(newFrame);
    return newFrame;
  };

  moveDownPress = (): void => {
    const { questAnimation } = this.props;
    const {
      yOffsetLargeStep,
      largeStepDelay,
      largeStepRepeat,
    } = questAnimation;
    this.moveButtonPressTimer = setTimeout(() => {
      this.moveButtonPressInterval = setInterval(
        () => this.moveDown(yOffsetLargeStep),
        largeStepRepeat
      );
    }, largeStepDelay);
  };

  moveDownRelease = (mouseLeave: boolean): void => {
    const { questAnimation } = this.props;
    const { yOffsetSmallStep } = questAnimation;
    clearTimeout(this.moveButtonPressTimer);
    clearInterval(this.moveButtonPressInterval);
    if (!mouseLeave) {
      const frame = this.moveDown(yOffsetSmallStep);
      this.setAnimation(frame);
    }
  };

  moveLeft = (stepSize: number): IAnimationFrame => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { xOffsetMin } = questAnimation;
    const newCanvasContainerWidth =
      this.canvasContainer.getBoundingClientRect().width - 2;

    const item = this.getActiveCanvasItem();
    const offsetCoeff = newCanvasContainerWidth / item.get('width');
    const newOffset = activeFrame.xOffset - stepSize;
    const xOffset = newOffset > xOffsetMin ? newOffset : xOffsetMin;

    item.set({ left: xOffset * offsetCoeff });
    this.canvas.renderAll();
    const newFrame = { ...activeFrame, xOffset };
    setActiveFrame(newFrame);
    return newFrame;
  };

  moveLeftPress = (): void => {
    const { questAnimation } = this.props;
    const {
      xOffsetLargeStep,
      largeStepDelay,
      largeStepRepeat,
    } = questAnimation;
    this.moveButtonPressTimer = setTimeout(() => {
      this.moveButtonPressInterval = setInterval(
        () => this.moveLeft(xOffsetLargeStep),
        largeStepRepeat
      );
    }, largeStepDelay);
  };

  moveLeftRelease = (mouseLeave: boolean): void => {
    const { questAnimation } = this.props;
    const { xOffsetSmallStep } = questAnimation;
    clearTimeout(this.moveButtonPressTimer);
    clearInterval(this.moveButtonPressInterval);
    if (!mouseLeave) {
      const frame = this.moveLeft(xOffsetSmallStep);
      this.setAnimation(frame);
    }
  };

  moveRigth = (stepSize: number): IAnimationFrame => {
    const { questAnimation, activeFrame, setActiveFrame } = this.props;
    const { xOffsetMax } = questAnimation;
    const newCanvasContainerWidth =
      this.canvasContainer.getBoundingClientRect().width - 2;

    const item = this.getActiveCanvasItem();
    const offsetCoeff = newCanvasContainerWidth / item.get('width');
    const newOffset = activeFrame.xOffset + stepSize;
    const xOffset = newOffset < xOffsetMax ? newOffset : xOffsetMax;

    item.set({ left: xOffset * offsetCoeff });
    this.canvas.renderAll();
    const newFrame = { ...activeFrame, xOffset };
    setActiveFrame(newFrame);
    return newFrame;
  };

  moveRigthPress = (): void => {
    const { questAnimation } = this.props;
    const {
      xOffsetLargeStep,
      largeStepDelay,
      largeStepRepeat,
    } = questAnimation;
    this.moveButtonPressTimer = setTimeout(() => {
      this.moveButtonPressInterval = setInterval(
        () => this.moveRigth(xOffsetLargeStep),
        largeStepRepeat
      );
    }, largeStepDelay);
  };

  moveRigthRelease = (mouseLeave: boolean): void => {
    const { questAnimation } = this.props;
    const { xOffsetSmallStep } = questAnimation;
    clearTimeout(this.moveButtonPressTimer);
    clearInterval(this.moveButtonPressInterval);
    if (!mouseLeave) {
      const frame = this.moveRigth(xOffsetSmallStep);
      this.setAnimation(frame);
    }
  };

  zoomInCanvas = (): void => {
    const { questAnimation, setAnimationData, activeFrame } = this.props;
    const { magnificationMax, magnificationStep } = questAnimation;
    let newZoom = this.canvas.getZoom() + magnificationStep / 100;

    if (newZoom * 100 >= magnificationMax) {
      newZoom = magnificationMax / 100;
    }

    newZoom = Math.round(newZoom * 10) / 10;
    this.canvas.hoverCursor = 'move';
    this.canvas.setZoom(newZoom).renderAll();
    setAnimationData({ zoom: Math.round(newZoom * 100) });
    this.setAnimation(activeFrame);
  };

  zoomOutCanvas = (): void => {
    const { questAnimation, setAnimationData, activeFrame } = this.props;
    const { magnificationMin, magnificationStep } = questAnimation;

    let newZoom = this.canvas.getZoom() - magnificationStep / 100;

    if (newZoom * 100 <= magnificationMin) {
      newZoom = magnificationMin / 100;
      this.canvas.hoverCursor = 'auto';
    }

    newZoom = Math.round(newZoom * 10) / 10;
    this.canvas.setZoom(newZoom).renderAll();
    this.updatePan();
    setAnimationData({ zoom: Math.round(newZoom * 100) });
    this.setAnimation(activeFrame);
  };

  onPageRezise = (updateAnimation = true): void => {
    const { questAnimationFrames, activeFrame } = this.props;
    const { frameList } = questAnimationFrames;
    const newCanvasContainerWidth =
      this.canvasContainer.getBoundingClientRect().width - 2;

    const canvasZoom = this.canvas.getZoom();
    //set zoom to 1 before canvas rezise
    this.canvas.setZoom(1);

    this.canvas.setWidth(newCanvasContainerWidth); // 2px border
    this.canvas.setHeight(newCanvasContainerWidth); // 2px border

    const canvasObjects = this.canvas.getObjects();
    canvasObjects.map((item: any, index: number): any => {
      //scale all images to new canvas width
      const offsetCoeff = newCanvasContainerWidth / item.get('width');
      item.scaleToWidth(newCanvasContainerWidth);
      item.set({
        left: frameList[index].xOffset * offsetCoeff,
        top: -frameList[index].yOffset * offsetCoeff,
      });
      return item;
    });

    //reset zoom after canvas rezise
    this.canvas.setZoom(canvasZoom);

    this.canvas.renderAll();
    if (updateAnimation) {
      this.setAnimation(activeFrame);
    }
  };

  onPlay = (): void => {
    const { questAnimation, questAnimationFrames, activeFrame } = this.props;
    const { previewDelaySlow, previewZoomLevel } = questAnimation;
    const { frameList } = questAnimationFrames;
    const previewFrameList = frameList.filter(
      ({ empty }: IAnimationFrame): any => !empty
    );

    this.setState(
      {
        activeAnimationStep: ANIMATION_STEPS.PLAY,
        previewFrameList,
      },
      () => {
        const canvasObjects = this.canvas.getObjects();

        canvasObjects.map((item: any): any => {
          item.set({ visible: false, opacity: 1 });
          return item;
        });
        if (previewZoomLevel === 'default') {
          this.canvas.setZoom(previewZoomLevel);
        }
        this.canvas.renderAll();
        this.previewAnimationStart(previewDelaySlow, false, 'PLAY');
      }
    );
  };

  changeActivePreviewImage = (prevIndex: number, nextIndex: number): void => {
    this.canvas.item(prevIndex).set({ visible: false });
    this.canvas.item(nextIndex).set({ visible: true });
    this.setState({ activePreviewImage: nextIndex });
    this.canvas.renderAll();
  };

  prevPreviewImage = (): void => {
    const { activePreviewImage, previewFrameList } = this.state;

    if (activePreviewImage === 0) {
      this.changeActivePreviewImage(0, previewFrameList.length - 1);
    } else {
      this.changeActivePreviewImage(activePreviewImage, activePreviewImage - 1);
    }
  };

  nextPreviewImage = (): void => {
    const { activePreviewImage, previewFrameList } = this.state;

    if (activePreviewImage === previewFrameList.length - 1) {
      this.changeActivePreviewImage(previewFrameList.length - 1, 0);
    } else {
      this.changeActivePreviewImage(activePreviewImage, activePreviewImage + 1);
    }
  };

  previewAnimationStart = (
    speed: number,
    singleStep: boolean,
    type?: string
  ): void => {
    const { activeFrame } = this.props;
    const { activePreviewImage } = this.state;

    this.previewAnimationStop();
    this.changeActivePreviewImage(activePreviewImage, 0);

    if (!singleStep) {
      this.previewAnimationInterval = setInterval(this.nextPreviewImage, speed);
      this.setState({ previewSingleStep: false });
      this.setAnimation(activeFrame, BUTTON_TYPES[type]);
    } else {
      this.setState({ previewSingleStep: true });
    }
  };

  previewAnimationStop = (): void => {
    clearInterval(this.previewAnimationInterval);
  };

  getActiveCanvasItem = (): any => {
    const { activeFrame } = this.props;
    const { frameIndex } = activeFrame;
    return this.canvas.item(frameIndex - 1);
  };

  onEdit = (): any => {
    const {
      activeFrame,
      questAnimation,
      questAnimationData,
      questAnimationFrames,
    } = this.props;
    const { frameIndex } = activeFrame;
    const { magnificationDefault } = questAnimation;
    const { zoom } = questAnimationData;
    const { frameList } = questAnimationFrames;

    this.previewAnimationStop();
    this.setState({ activeAnimationStep: ANIMATION_STEPS.EDIT });

    const canvasObjects = this.canvas.getObjects();

    canvasObjects.map((item: any, index: number): any => {
      item.set({ visible: false, opacity: frameList[index].empty ? 1 : 0.5 });
      return item;
    });

    const newZoom = zoom || magnificationDefault;

    this.canvas.item(0).set({ visible: true, opacity: 1 });
    this.canvas.item(frameIndex - 1).set({ visible: true });
    this.canvas.setZoom(activeFrame.empty ? 1 : newZoom / 100);
    this.canvas.renderAll();
    this.setAnimation(activeFrame, BUTTON_TYPES.EDIT);
  };

  onFinish = (): any => {
    const { activeFrame } = this.props;
    this.previewAnimationStop();
    this.setState({ activeAnimationStep: ANIMATION_STEPS.COMPLETED });
    this.setAnimation(activeFrame, BUTTON_TYPES.FINISH);
  };

  getAnimation = (): void => {
    const { module, questId, stepData, getAnimation } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;
    if (questId && moduleId) {
      getAnimation({ questId, questUUID, moduleId, moduleUUID }).then(
        ({ payload }: any): void => {
          this.canvas.setZoom(payload.magnificationDefault / 100);
        }
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
    const {
      setActiveFrame,
      activeFrame,
      questAnimation,
      questAnimationData,
      questAnimationFrames,
    } = this.props;
    const { frameIndex } = activeFrame;
    const { magnificationDefault } = questAnimation;
    const { zoom } = questAnimationData;
    const { frameList } = questAnimationFrames;

    if (frameIndex !== 1) {
      this.canvas.item(frameIndex - 1).set({ visible: false });
    }

    if (frameList[frameIndex - 1].empty && !frame.empty) {
      if (zoom && zoom > magnificationDefault) {
        this.canvas.hoverCursor = 'move';
      }
      this.canvas.viewportTransform = [...this.vpt];
      this.canvas.setZoom(zoom ? zoom / 100 : magnificationDefault / 100);
    }

    if (frame.empty) {
      this.canvas.hoverCursor = 'auto';
      this.canvas.setZoom(1);
      this.canvas.viewportTransform[4] = 0;
      this.canvas.viewportTransform[5] = 0;
    }

    this.canvas.item(frame.frameIndex - 1).set({ visible: true });
    this.canvas.renderAll();

    setActiveFrame(frame);
  };

  setAnimation = (frame: IAnimationFrame, button?: string): void => {
    const { setAnimation, module, questId } = this.props;
    const { moduleId } = module;
    const { offsetReference, frameIndex, xOffset, yOffset } = frame;
    const zoom = this.canvas.getZoom();
    const currentItem = this.canvas.item(frame.frameIndex - 1);
    const size = this.canvas.getWidth();
    const scaledSize = size * zoom;
    const imageScaleY = currentItem.get('scaleY');
    const imageHeight = currentItem.get('height');

    const data = {
      questId,
      moduleId,
      requestType: 'frame',
      action: 'submit',
      frameIndex,
      xOffset,
      yOffset,
      offsetReference,
      zoom,
      width: size,
      height: size,
      left: -this.vpt[4],
      top: -this.vpt[5],
      button,
      serializedFramesAll: JSON.stringify(this.canvas),
      scaleX: currentItem.get('scaleX'),
      scaleY: imageScaleY,
      imageWidth: currentItem.get('width'),
      imageHeight,
      scaledImageWidth: scaledSize,
      scaledImageHeight: imageHeight * imageScaleY * zoom,
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
    const {
      activeAnimationStep,
      activePreviewImage,
      previewFrameList,
      previewSingleStep,
    } = this.state;
    const { caption, infoArray, xOffset, yOffset, empty } = activeFrame;
    const { zoom } = questAnimationData;
    const { objectName, imageDate, imageTime } = infoArray;
    const { previewHeading, previewSubheading } = questAnimation;
    const {
      frameList,
      activityStatus,
      activityTitle,
      activityInstructions,
      activitySequenceText,
    } = questAnimationFrames;

    return (
      <div className="animation-module">
        <QuestStepModuleHeader
          title={activityTitle}
          completed={activityStatus === 'complete'}
          sequenceText={activitySequenceText}
          instructions={activityInstructions}
        />
        <div
          className={cx({
            'animation-edit': activeAnimationStep !== ANIMATION_STEPS.EDIT,
            'animation-play': activeAnimationStep !== ANIMATION_STEPS.PLAY,
            visible: activeAnimationStep !== ANIMATION_STEPS.COMPLETED,
          })}
        >
          <div className="animation-box">
            {activeAnimationStep === ANIMATION_STEPS.EDIT && (
              <>
                <h6>{caption}</h6>
                <h4>{`${objectName} ${imageDate} ${imageTime}`}</h4>
              </>
            )}

            {activeAnimationStep === ANIMATION_STEPS.PLAY && (
              <>
                <h6>{previewHeading}</h6>
                <h4>{previewSubheading}</h4>
                {previewSingleStep && (
                  <h4>{`${previewFrameList[activePreviewImage].infoArray.objectName} ${previewFrameList[activePreviewImage].infoArray.imageDate} ${previewFrameList[activePreviewImage].infoArray.imageTime}`}</h4>
                )}
                <div className="animation-lines">
                  {previewFrameList.map(
                    ({ frameIndex, frameId }: IAnimationFrame) => (
                      <div
                        key={`animation-line-${frameId}`}
                        className={cx('animation-line', {
                          active: frameIndex - 1 === activePreviewImage,
                        })}
                      />
                    )
                  )}
                </div>
              </>
            )}

            <div
              id="animationCanvasContainer"
              ref={(node): void => {
                this.canvasContainer = node;
              }}
            >
              <canvas id="animation-canvas" />
            </div>

            {activeAnimationStep === ANIMATION_STEPS.EDIT && (
              <EditAnimationControls
                questAnimation={questAnimation}
                xOffset={xOffset}
                yOffset={yOffset}
                zoom={zoom}
                moveLeftPress={this.moveLeftPress}
                moveLeftRelease={this.moveLeftRelease}
                moveRigthPress={this.moveRigthPress}
                moveRigthRelease={this.moveRigthRelease}
                moveDownPress={this.moveDownPress}
                moveDownRelease={this.moveDownRelease}
                moveTopPress={this.moveTopPress}
                moveTopRelease={this.moveTopRelease}
                zoomInCanvas={this.zoomInCanvas}
                zoomOutCanvas={this.zoomOutCanvas}
                onPlay={this.onPlay}
                disabledZoom={empty}
                disabledMove={empty || activeFrame.frameIndex === 1}
              />
            )}

            {activeAnimationStep === ANIMATION_STEPS.PLAY && (
              <PreviewAnimationControls
                questAnimation={questAnimation}
                onEdit={this.onEdit}
                onFinish={this.onFinish}
                onSpeedChange={this.previewAnimationStart}
                onPrevFrame={this.prevPreviewImage}
                onNextFrame={this.nextPreviewImage}
              />
            )}
          </div>

          {activeAnimationStep === ANIMATION_STEPS.EDIT && (
            <FrameList
              frameList={frameList}
              activeFrame={activeFrame}
              setActiveFrame={this.setActiveFrame}
            />
          )}
        </div>

        <div
          className={cx('animation-completed', {
            visible: activeAnimationStep === ANIMATION_STEPS.COMPLETED,
          })}
        >
          <AnimationCompleted
            questAnimation={questAnimation}
            onEdit={this.onEdit}
          />
        </div>
      </div>
    );
  }
}
