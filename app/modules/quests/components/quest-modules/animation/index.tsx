import React from 'react';
import { fabric } from 'fabric';
import cx from 'classnames';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';
import {
  IQuestStepModule,
  IQuestAnimation,
  IAnimationFrame,
  IQuestAnimationData,
  IQuestAnimationFrames,
} from 'app/modules/quests/types';
import { downloadFile } from 'app/utils/downloadFile';
import Dots from 'app/atoms/icons/Dots';
import { QuestDotMenu } from 'app/modules/quests/components/quest-dot-menu';
import { FrameList } from './frame-list';
import { EditAnimationControls } from './edit-animation-controls';
import { PreviewAnimationControls } from './preview-animation-controls';
import { QuestStepModuleHeader } from '../../quest-step-module-header';
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
  startQuestFetching: Function;
};

type AnimationModuleState = {
  activeAnimationStep: string;
  activePreviewImage: number;
  previewFrameList: Array<IAnimationFrame>;
  previewSingleStep: boolean;
  isDotsMenuOpen: boolean;
};

const ANIMATION_STEPS: { [key: string]: string } = {
  edit: 'edit',
  play: 'play',
  finished: 'finished',
  none: 'edit',
};

const BUTTON_TYPES: { [key: string]: string } = {
  EDIT: 'edit',
  PLAY: 'play',
  FINISH: 'finish',
  SLOW: 'slow',
  MED: 'med',
  FAST: 'fast',
  FRAME: 'frame',
  EDIT_ANIMATION: 'editAnimation',
};

const RESIZE_DELTA = 300;

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

  resizeTime: number;

  resizeTimeout: ReturnType<typeof setTimeout>;

  state = {
    activeAnimationStep: ANIMATION_STEPS.edit,
    activePreviewImage: 0,
    previewFrameList: [{} as IAnimationFrame],
    previewSingleStep: false,
    isDotsMenuOpen: false,
  };

  componentDidMount(): void {
    this.initCanvas();
    this.getAnimation();
    this.getAnimationFrames();
    window.addEventListener('resize', this.pageResize);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.pageResize);
    clearTimeout(this.resizeTimeout);
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
      const { activeAnimationStep } = this.state;

      if (!empty && activeAnimationStep !== ANIMATION_STEPS.finished) {
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
      const { activeAnimationStep } = this.state;
      this.isDragging = false;
      if (
        this.canvas.getZoom() > 1 &&
        activeAnimationStep !== ANIMATION_STEPS.finished
      ) {
        this.setAnimation(activeFrame);
      }
    });
  };

  initFramesImages = ({
    frameList,
    left,
    top,
    zoom,
    activityState,
  }: IQuestAnimationFrames): void => {
    const { activeFrame } = this.props;
    const { empty } = activeFrame;
    this.loadImageFromUrl(0, frameList);

    this.onPageRezise(false);

    this.vpt[4] = left ? -left : 0;
    this.vpt[5] = top ? -top : 0;
    this.canvas.setZoom(empty ? 1 : zoom);
    this.canvas.viewportTransform[4] = left ? -left : 0;
    this.canvas.viewportTransform[5] = top ? -top : 0;
    this.updatePan();
    this.setActiveStep(activityState);
    this.renderFabricCanvas();
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
    } else if (this.vpt[4] <= rightEdge) {
      this.canvas.viewportTransform[4] = rightEdge;
      this.vpt[4] = rightEdge;
    }

    if (this.vpt[5] >= 0) {
      this.canvas.viewportTransform[5] = 0;
      this.vpt[5] = 0;
    } else if (this.vpt[5] <= bottomEdge) {
      this.canvas.viewportTransform[5] = bottomEdge;
      this.vpt[5] = bottomEdge;
    }

    this.canvas.renderAll();
  };

  loadImageFromUrl = (
    frameIndexToLoad: number,
    frameList: Array<IAnimationFrame>
  ): void => {
    const {
      frameIndex,
      imageURL,
      xOffset,
      yOffset,
      empty,
      selected,
    } = frameList[frameIndexToLoad];
    const { questAnimation } = this.props;
    const { offsetReference } = questAnimation;
    const newCanvasContainerWidth =
      this.canvasContainer.getBoundingClientRect().width - 2;

    const imgAttrs = {
      centeredScaling: offsetReference !== 'center',
      crossOrigin: 'anonymous',
      selectable: false,
      opacity: frameIndex > 1 && !empty ? 0.5 : 1,
      originX:
        offsetReference === 'center' && !empty ? offsetReference : 'left',
      originY: offsetReference === 'center' && !empty ? offsetReference : 'top',
      visible: frameIndex === 1 || selected,
    };

    fabric.util.loadImage(imageURL, (img: any): void => {
      //load image to fabric
      const fabricImage = new fabric.Image(img, imgAttrs);

      const offsetCoeff = newCanvasContainerWidth / fabricImage.get('width');
      fabricImage.set({
        left: empty ? 0 : xOffset * offsetCoeff,
        top: empty ? 0 : -yOffset * offsetCoeff,
      });

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

  resizeEnd = (): void => {
    const { activeFrame } = this.props;
    const { activeAnimationStep } = this.state;
    if (activeAnimationStep !== ANIMATION_STEPS.finished) {
      if (Date.now() - this.resizeTime < RESIZE_DELTA) {
        this.resizeTimeout = setTimeout(this.resizeEnd, RESIZE_DELTA);
      } else {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = undefined;
        this.setAnimation(activeFrame);
      }
    }
  };

  pageResize = () => {
    this.onPageRezise();
  };

  onPageRezise = (updateAnimation = true): void => {
    const { questAnimationFrames } = this.props;
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

    this.renderFabricCanvas(canvasObjects);
    if (updateAnimation) {
      this.resizeTime = Date.now();
      if (!this.resizeTimeout) {
        this.resizeTimeout = setTimeout(this.resizeEnd, RESIZE_DELTA);
      }
    }
  };

  renderFabricCanvas = (objects?: any): void => {
    const { questAnimation } = this.props;
    const { negativeFlag } = questAnimation;
    const canvasObjects = objects || this.canvas.getObjects();
    const ctx = this.canvas.getContext();
    const bgColor = negativeFlag ? 'rgba(255, 255, 255)' : 'rgba(0, 0, 0)';
    ctx.filter = negativeFlag ? 'invert(1)' : 'none';

    this.canvas.setBackgroundColor(bgColor);
    this.canvas.renderCanvas(ctx, canvasObjects);
  };

  onPlay = (): void => {
    const { questAnimation, questAnimationFrames } = this.props;
    const { previewDelaySlow, previewZoomLevel } = questAnimation;
    const { frameList } = questAnimationFrames;
    const previewFrameList = frameList.filter(
      ({ empty }: IAnimationFrame): any => !empty
    );

    this.setState(
      {
        activeAnimationStep: ANIMATION_STEPS.play,
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

  onEdit = (
    initialLoad?: boolean,
    buttonType: string = BUTTON_TYPES.EDIT
  ): void => {
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
    this.setState({ activeAnimationStep: ANIMATION_STEPS.edit });

    const canvasObjects = this.canvas.getObjects();

    canvasObjects.map((item: any, index: number): any => {
      item.set({ visible: false, opacity: frameList[index].empty ? 1 : 0.5 });
      return item;
    });

    if (!initialLoad) {
      const newZoom = zoom || magnificationDefault;
      this.canvas.item(0).set({ visible: true, opacity: 1 });
      this.canvas.item(frameIndex - 1).set({ visible: true });
      this.canvas.setZoom(activeFrame.empty ? 1 : newZoom / 100);
      this.canvas.hoverCursor = 'move';
      this.canvas.renderAll();
      this.setAnimation(activeFrame, buttonType).then(() => {
        this.getAnimation().then(() => {
          this.canvas.setZoom(activeFrame.empty ? 1 : newZoom / 100);
        });
      });
    }
  };

  onFinish = (initialLoad?: boolean): any => {
    const { activeFrame, startQuestFetching } = this.props;
    this.canvas.hoverCursor = 'auto';
    this.canvas.renderAll();
    this.previewAnimationStop();
    if (!initialLoad) {
      startQuestFetching();
      this.setAnimation(activeFrame, BUTTON_TYPES.FINISH).then(() =>
        this.getAnimation().then(() =>
          this.setState({ activeAnimationStep: ANIMATION_STEPS.finished })
        )
      );
    } else {
      this.setState({ activeAnimationStep: ANIMATION_STEPS.finished });
    }
  };

  getAnimation = (): Promise<any> => {
    const { module, questId, stepData, getAnimation } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;
    if (questId && moduleId) {
      return getAnimation({ questId, questUUID, moduleId, moduleUUID }).then(
        ({ payload }: any): void => {
          this.canvas.setZoom(payload.magnificationDefault / 100);
          this.renderFabricCanvas();
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
        ({ payload }: any): void => {
          this.initFramesImages(payload);
        }
      );
    }
  };

  setActiveStep = (step: string): void => {
    switch (step) {
      case ANIMATION_STEPS.edit: {
        this.onEdit(true);
        break;
      }
      case ANIMATION_STEPS.play: {
        this.onEdit(true);
        break;
      }
      case ANIMATION_STEPS.finished: {
        this.onFinish(true);
        break;
      }
      default: {
        this.onEdit(true);
      }
    }
  };

  setActiveFrame = (
    frame: IAnimationFrame,
    callSetAnimation?: boolean
  ): void => {
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
    if (callSetAnimation) {
      this.setAnimation(frame, BUTTON_TYPES.FRAME);
    }
  };

  setAnimation = (frame: IAnimationFrame, button?: string): Promise<any> => {
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
      scaleX: currentItem.get('scaleX'),
      scaleY: imageScaleY,
      imageWidth: currentItem.get('width'),
      imageHeight,
      scaledImageWidth: scaledSize,
      scaledImageHeight: imageHeight * imageScaleY * zoom,
    };

    return setAnimation(data).then(
      ({ payload: { refreshModule } }: any): void => {
        if (refreshModule) {
          this.canvas.clear();
          this.getAnimation();
          this.getAnimationFrames();
        }
      }
    );
  };

  toggleDotsMenu = (): void => {
    const { isDotsMenuOpen } = this.state;

    this.setState({ isDotsMenuOpen: !isDotsMenuOpen });
  };

  getDotsMenuItems = (): Array<any> => {
    const { questAnimation, activeFrame } = this.props;
    const { dotMenu } = questAnimation;
    const {
      showNegative,
      enableNegative,
      negativeButton,
      negativeText,
    } = dotMenu;

    return [
      {
        show: showNegative,
        disabled: !enableNegative,
        title: negativeText,
        action: (): Promise<any> =>
          this.setAnimation(activeFrame, negativeButton),
      },
    ];
  };

  render() {
    const {
      activeFrame,
      questAnimation,
      questAnimationFrames,
      questAnimationData,
      readOnly,
    } = this.props;
    const {
      activeAnimationStep,
      activePreviewImage,
      previewFrameList,
      previewSingleStep,
      isDotsMenuOpen,
    } = this.state;
    const {
      infoArray,
      xOffset,
      yOffset,
      empty,
      frameExplanation,
      frameHeader,
    } = activeFrame;
    const { zoom } = questAnimationData;
    const { objectName, imageDate, imageTime } = infoArray;
    const {
      previewHeading,
      previewSubheading,
      outputHeading,
      outputSubheading,
      editAnimationButtonCaption,
      showEditAnimationButton,
      editAnimationButtonTooltipText,
      showEditAnimationButtonTooltip,
      enableEditAnimationButton,
      showDownloadButton,
      downloadButtonTooltipText,
      showDownloadButtonTooltip,
      enableDownloadButton,
      outputURL,
      outputDownloadURL,
      showDotMenu,
      dotMenuTooltipText,
      enableDotMenu,
      activityStatus,
    } = questAnimation;
    const {
      frameList,
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
            'animation-edit': activeAnimationStep === ANIMATION_STEPS.edit,
            'animation-play': activeAnimationStep === ANIMATION_STEPS.play,
            'animation-completed':
              activeAnimationStep === ANIMATION_STEPS.finished,
            visible: true,
          })}
        >
          <div className="animation-box">
            {showDotMenu && activeAnimationStep === ANIMATION_STEPS.edit && (
              <div className="dot-menu-wrapper">
                <Tooltip
                  title={dotMenuTooltipText}
                  theme="light"
                  distance={10}
                  position="top"
                  disabled={isDotsMenuOpen}
                >
                  <Button
                    className={cx('quest-dot-menu-btn', {
                      open: isDotsMenuOpen,
                    })}
                    onClick={this.toggleDotsMenu}
                    disabled={!enableDotMenu || readOnly}
                  >
                    {!isDotsMenuOpen ? (
                      <Dots />
                    ) : (
                      <i className="menu-icon-close icon-close" />
                    )}
                  </Button>
                </Tooltip>

                <QuestDotMenu
                  show={isDotsMenuOpen}
                  items={this.getDotsMenuItems()}
                  toggle={this.toggleDotsMenu}
                />
              </div>
            )}

            {activeAnimationStep === ANIMATION_STEPS.edit && (
              <>
                {frameExplanation && <h4>{frameExplanation}</h4>}
                <h6>{frameHeader}</h6>
                <h4>{`${objectName} ${imageDate} ${imageTime}`}</h4>
              </>
            )}

            {activeAnimationStep === ANIMATION_STEPS.play && (
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
              {activeAnimationStep === ANIMATION_STEPS.finished && (
                <img src={`${outputURL}?time=${Date.now()}`} alt="" />
              )}
            </div>

            {activeAnimationStep === ANIMATION_STEPS.edit && (
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
                onFinish={this.onFinish}
                readOnly={readOnly}
              />
            )}

            {activeAnimationStep === ANIMATION_STEPS.play && (
              <PreviewAnimationControls
                questAnimation={questAnimation}
                onEdit={this.onEdit}
                onFinish={this.onFinish}
                onSpeedChange={this.previewAnimationStart}
                onPrevFrame={this.prevPreviewImage}
                onNextFrame={this.nextPreviewImage}
              />
            )}

            {activeAnimationStep === ANIMATION_STEPS.finished && (
              <div className="animation-completed-card">
                <div className="animation-completed-card-title">
                  {outputHeading}
                </div>
                <div className="animation-completed-card-subtitle">
                  {outputSubheading}
                </div>
              </div>
            )}
          </div>

          {activeAnimationStep === ANIMATION_STEPS.edit && (
            <FrameList
              frameList={frameList}
              activeFrame={activeFrame}
              setActiveFrame={this.setActiveFrame}
              readOnly={readOnly}
            />
          )}
        </div>

        {activeAnimationStep === ANIMATION_STEPS.finished && (
          <div className="animation-completed-actions">
            <div className="animation-completed-actions-edit">
              {showEditAnimationButton && (
                <Tooltip
                  theme="dark"
                  title={editAnimationButtonTooltipText}
                  distance={10}
                  position="top"
                  disabled={!showEditAnimationButtonTooltip}
                >
                  <Button
                    className="dc-slot-card-find-btn"
                    onClick={(): void =>
                      this.onEdit(false, BUTTON_TYPES.EDIT_ANIMATION)
                    }
                    disabled={!enableEditAnimationButton}
                  >
                    {editAnimationButtonCaption}
                  </Button>
                </Tooltip>
              )}
            </div>
            <div className="animation-completed-actions-separator" />
            <div className="animation-completed-actions-download">
              {showDownloadButton && (
                <Tooltip
                  title={downloadButtonTooltipText}
                  distance={10}
                  position="top"
                  disabled={!showDownloadButtonTooltip}
                >
                  <Button
                    className="btn-circle"
                    onClick={(): void =>
                      downloadFile(
                        `${outputDownloadURL}?time=${Date.now()}`,
                        outputDownloadURL.substring(
                          outputDownloadURL.lastIndexOf('/') + 1
                        )
                      )
                    }
                    disabled={!enableDownloadButton}
                  >
                    <span className="icon-download" />
                  </Button>
                </Tooltip>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
