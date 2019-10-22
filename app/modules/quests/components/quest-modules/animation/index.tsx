import React from 'react';
import { fabric } from 'fabric';
import { Button } from 'react-bootstrap';
import { IQuestStepModule } from 'app/modules/quests/types';
import './styles.scss';

type AnimationModuleProps = {
  module: IQuestStepModule;
  readOnly: boolean;
  routeParams: any;
  navigateToNextStep: Function;
  refreshQuestStep: Function;
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

  componentDidMount() {
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
      function(img) {
        // add image onto canvas (it also re-render the canvas)
        //img.set('selectable', false); // make img unselectable

        img.scaleToWidth(canvasContainerWidth);
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.onPageRezise);
  }

  moveTop = () => {
    const item = this.canvas.item(0);
    item.set({ top: item.get('top') - 10 });
    this.canvas.renderAll();
  };

  moveDown = () => {
    const item = this.canvas.item(0);
    item.set({ top: item.get('top') + 10 });
    this.canvas.renderAll();
  };

  moveLeft = () => {
    const item = this.canvas.item(0);
    item.set({ left: item.get('left') - 10 });
    this.canvas.renderAll();
  };

  moveRigth = () => {
    const item = this.canvas.item(0);
    item.set({ left: item.get('left') + 10 });
    this.canvas.renderAll();
  };

  zoomIn = () => {
    const item = this.canvas;
    const zoom = item.getZoom() + 0.1;
    // zoom = zoom + 1;
    // if (zoom < 1) zoom = 1;
    item.setZoom(zoom);
  };

  zoomOut = () => {
    const item = this.canvas;
    const zoom = item.getZoom() - 0.1;
    // zoom = zoom + 1;
    // if (zoom < 1) zoom = 1;
    item.setZoom(zoom);
  };

  onPageRezise = () => {
    const canvasContainerWidth = this.canvasContainer.getBoundingClientRect()
      .width;
    console.log(canvasContainerWidth);
    this.canvas.setWidth(canvasContainerWidth);
    this.canvas.setHeight(canvasContainerWidth);
  };

  render() {
    console.log(this.canvas);
    // if(this.canvas) {
    //   console.log(this.canvas.getWidth());
    //   this.canvas.set({ height: this.canvas.getWidth() });
    // }
    return (
      <div className="animation-module">
        <div className="animation-box">
          <h6>Frame 1</h6>
          <h4>Pluto Oct 28, 2018 00:35 UTC</h4>
          <div
            id="animationCanvasContainer"
            ref={node => {
              this.canvasContainer = node;
            }}
          >
            <canvas id="c" />
            <br />
            <Button onClick={this.moveTop}>up</Button>
            <Button onClick={this.moveDown}>down</Button>
            <Button onClick={this.moveLeft}>left</Button>
            <Button onClick={this.moveRigth}>right</Button>
            <br />
            <Button onClick={this.zoomIn}>zoom +</Button>
            <Button onClick={this.zoomOut}>zoom -</Button>
            <br />
            <Button onClick={() => console.log(JSON.stringify(this.canvas))}>
              get json
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
