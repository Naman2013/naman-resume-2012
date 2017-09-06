import React, { Component } from 'react';
import ResponsiveContainer from '../ResponsiveContainer';
import { monoFont } from '../../styles/variables/fonts';
import { black, brightGreen } from '../../styles/variables/colors';
import borderImage from '../../../assets/images/borders/telescope-viewer-ticked-border.png';

/**
  - background layer - full black, full width
  - foreground layer - has the dashed border
  - foreground layer - fully transparent ( covers background )
  - foreground layer - transforms to perfect circle centered and sized to the canvas
  */

class Frame extends Component {
  state = {
    containerWidth: 100,
    containerHeight: 100,
  };

  componentDidMount() {
    this.drawBackground();
  }

  drawBackground() {
    console.log(this.canvasContext);
  }

  canvas = null;
  canvasContext = null;

  handleDocumentResize = ({ width, height }) => {
    this.setState({
      containerWidth: width,
      containerHeight: height,
    })
  }

  render() {
    const { containerWidth, containerHeight } = this.state;

    return (
      <div>
        <ResponsiveContainer
          width={containerWidth}
          height={containerHeight}
          onResizeHandler={this.handleDocumentResize}
        >
          <canvas
            className="root"
            ref={(canvas) => {
              if (canvas) {
                this.canvas = canvas;
                this.canvasContext = canvas.getContext('2d');
              }
            }}
          />
        </ResponsiveContainer>

        <style jsx>{`
          .root {
            border: 1px solid ${brightGreen};
            font-family: ${monoFont};
            color: ${brightGreen};
            background-color: ${black};
            min-width: 100%;
            min-height: 100%;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default Frame;
