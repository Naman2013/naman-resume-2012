import React from 'react';
import { fabric } from 'fabric';
import { Button } from 'react-bootstrap';
import { IQuestStepModule } from 'app/modules/quests/types';
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
};

type AnimationModuleState = {
  // prevStepId: string;
  // nextStepId: string;
  // stepKey: string;
  // stepId: string;
};

// export const AnimationModule: React.FC<AnimationModuleProps> = React.memo(
//   props => {
//     return <div>TEST</div>;
//   }
// );

export class AnimationModule extends React.PureComponent<
  AnimationModuleProps,
  AnimationModuleState
> {
  // constructor(props: AnimationModuleProps) {
  //   super(props);

  //   this.canvas = new fabric.Canvas('c');
  // }

  componentDidMount(): void {
    this.getAnimation();
    this.getAnimationFrames();
    window.addEventListener('resize', this.onPageRezise);
    const canvas = new fabric.Canvas('c');
    const canvasContainerWidth = this.canvasContainer.getBoundingClientRect()
      .width;
    canvas.selection = false; // disable group selection

    const imgAttrs = {
      crossOrigin: 'anonymous',
      selectable: false,
      cursor: 'auto',
    };

    fabric.Image.fromURL(
      'https://juno.slooh.com/dev101/2019/10/16c7/8aff/pluto3.jpg',
      (img): void => {
        // add image onto canvas (it also re-render the canvas)
        //img.set('selectable', false); // make img unselectable

        img.scaleToWidth(canvasContainerWidth - 2); // 2px border
        canvas.add(img); //.centerObject(img);
        //img.setCoords();
        canvas.renderAll();
      },
      imgAttrs
    );

    // fabric.Image.fromURL(
    //   'https://juno.slooh.com/dev101/2019/10/8bc8/ff97/pluto1.jpg',
    //   function(img) {
    //     // add image onto canvas (it also re-render the canvas)
    //     img.set('selectable', false); // make img unselectable

    //     img.set({ opacity: 0.5 });
    //     //img.scaleToWidth(620);
    //     canvas.add(img);//.centerObject(img);
    //     //img.setCoords();
    //     canvas.renderAll();
    //   },
    //   { crossOrigin: 'anonymous' }
    // );
    this.canvas = canvas;
    this.onPageRezise();
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.onPageRezise);
  }

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
    const item = this.canvas;
    const zoom = item.getZoom() + 0.1;
    // zoom = zoom + 1;
    // if (zoom < 1) zoom = 1;
    item.setZoom(zoom);
  };

  zoomOut = (): void => {
    const item = this.canvas;
    const zoom = item.getZoom() - 0.1;
    // zoom = zoom + 1;
    // if (zoom < 1) zoom = 1;
    item.setZoom(zoom);
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
      getAnimationFrames({ questId, questUUID, moduleId, moduleUUID });
    }
  };

  render() {
    const { activeFrame, setActiveFrame } = this.props;
    const frameList = [
      { frameId: 1, caption: 'FRAME 1' },
      { frameId: 2, caption: 'FRAME 2' },
      { frameId: 3, caption: 'FRAME 3' },
      { frameId: 4, caption: 'FRAME 4' },
      { frameId: 5, caption: 'FRAME 5' },
    ];
    // if(this.canvas) {
    //   console.log(this.canvas.getWidth());
    //   this.canvas.set({ height: this.canvas.getWidth() });
    // }
    return (
      <div className="animation-module">
        <div className="animation-box">
          <h6>Frame 1</h6>
          <h4>Pluto Oct 28, 2018 00:35 UTC</h4>
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
              <p>100%</p>
            </div>

            <div className="controls-block">
              <Button onClick={() => {}}>Play</Button>
            </div>
          </div>
        </div>

        <FrameList
          frameList={frameList}
          activeFrame={activeFrame}
          setActiveFrame={setActiveFrame}
        />

        <br />
        <Button onClick={() => console.log(JSON.stringify(this.canvas))}>
          get json
        </Button>
      </div>
    );
  }
}
