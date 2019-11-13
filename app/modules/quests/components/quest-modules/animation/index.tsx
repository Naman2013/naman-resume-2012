import React from 'react';
import { fabric } from 'fabric';
import cx from 'classnames';
import {
  IQuestStepModule,
  IQuestAnimation,
  IQuestAnimationFrames,
  IAnimationFrame,
  IQuestAnimationData,
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
  previewFrameList: Array<any>;
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

  previewAnimationInterval: ReturnType<typeof setInterval>;

  state = {
    activeAnimationStep: ANIMATION_STEPS.EDIT,
    activePreviewImage: 0,
    previewFrameList: [{}],
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
    this.canvas = new fabric.Canvas('animation-canvas');
    this.canvas.selection = false; // disable group selection
    this.onPageRezise();
  };

  initFramesImages = (frameList: Array<IAnimationFrame>): void => {
    this.loadImageFromUrl(0, frameList);
    this.canvas.renderAll();
    this.onPageRezise();
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
      hoverCursor: 'auto',
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
      let fabricImage = new fabric.Image(img, imgAttrs);
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
    const newCanvasContainerWidth =
      this.canvasContainer.getBoundingClientRect().width - 2;

    const canvasZoom = this.canvas.getZoom();
    //set zoom to 1 before canvas rezise
    this.canvas.setZoom(1);

    this.canvas.setWidth(newCanvasContainerWidth); // 2px border
    this.canvas.setHeight(newCanvasContainerWidth); // 2px border

    const canvasObjects = this.canvas.getObjects();
    canvasObjects.map((item: any): any => {
      //scale all images to new canvas width
      item.scaleToWidth(newCanvasContainerWidth);
      return item;
    });

    //reset zoom after canvas rezise
    this.canvas.setZoom(canvasZoom);

    this.canvas.renderAll();
  };

  onPlay = (): void => {
    const { questAnimation, questAnimationFrames } = this.props;
    const { previewDelaySlow, previewZoomLevel } = questAnimation;
    const { frameList } = questAnimationFrames;
    const previewFrameList = frameList.filter(
      ({ empty }: IAnimationFrame): any => !empty
    );

    this.setState({
      activeAnimationStep: ANIMATION_STEPS.PLAY,
      previewFrameList,
    });

    const canvasObjects = this.canvas.getObjects();

    canvasObjects.map((item: any): any => {
      item.set({ visible: false, opacity: 1 });
      return item;
    });
    if (previewZoomLevel === 'default') {
      this.canvas.setZoom(previewZoomLevel);
    }
    this.canvas.renderAll();
    this.previewAnimationStart(previewDelaySlow);
  };

  changeActivePreviewImage = (prevIndex: number, nextIndex: number): void => {
    this.canvas.item(prevIndex).set({ visible: false });
    this.canvas.item(nextIndex).set({ visible: true });
    this.setState({ activePreviewImage: nextIndex });
    this.canvas.renderAll();
  };

  previewAnimationStart = (speed: number): void => {
    const { activePreviewImage, previewFrameList } = this.state;

    this.previewAnimationStop();
    this.changeActivePreviewImage(activePreviewImage, 0);

    this.previewAnimationInterval = setInterval((): void => {
      const { activePreviewImage } = this.state;

      switch (activePreviewImage) {
        case 0: {
          this.changeActivePreviewImage(0, 1);
          break;
        }
        case previewFrameList.length - 1: {
          this.changeActivePreviewImage(previewFrameList.length - 1, 0);
          break;
        }
        default: {
          this.changeActivePreviewImage(
            activePreviewImage,
            activePreviewImage + 1
          );
          break;
        }
      }
    }, speed);
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
      questAnimationData,
      questAnimationFrames,
    } = this.props;
    const { frameIndex } = activeFrame;
    const { zoom } = questAnimationData;
    const { frameList } = questAnimationFrames;

    this.previewAnimationStop();
    this.setState({ activeAnimationStep: ANIMATION_STEPS.EDIT });
    const canvasObjects = this.canvas.getObjects();

    canvasObjects.map((item: any, index: number): any => {
      item.set({ visible: false, opacity: frameList[index].empty ? 1 : 0.5 });
      return item;
    });
    this.canvas.item(0).set({ visible: true, opacity: 1 });
    this.canvas.item(frameIndex - 1).set({ visible: true });
    this.canvas.setZoom(activeFrame.empty ? 1 : zoom / 100);
    this.canvas.renderAll();
  };

  onFinish = (): any => {
    this.previewAnimationStop();
    this.setState({ activeAnimationStep: ANIMATION_STEPS.COMPLETED });
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
      questAnimationData,
      questAnimationFrames,
    } = this.props;
    const { frameIndex } = activeFrame;
    const { zoom } = questAnimationData;
    const { frameList } = questAnimationFrames;

    if (frameIndex !== 1) {
      this.canvas.item(frameIndex - 1).set({ visible: false });
    }

    if (frameList[frameIndex - 1].empty) {
      this.canvas.setZoom(zoom / 100);
    }

    if (frame.empty) {
      this.canvas.setZoom(1);
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
    const {
      activeAnimationStep,
      activePreviewImage,
      previewFrameList,
    } = this.state;
    const { caption, infoArray, xOffset, yOffset, empty } = activeFrame;
    const { zoom } = questAnimationData;
    const { objectName, imageDate, imageTime } = infoArray;
    const { previewHeading, previewSubheading } = questAnimation;
    const { frameList } = questAnimationFrames;

    return (
      <div className="animation-module">
        <QuestStepModuleHeader
          title="activityTitle"
          completed
          sequenceText="activitySequenceText"
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
