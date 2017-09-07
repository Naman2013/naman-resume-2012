import React, { Component } from 'react';
import ResponsiveContainer from '../ResponsiveContainer';
import { monoFont } from '../../styles/variables/fonts';
import { black, brightGreen } from '../../styles/variables/colors';
import borderImage from '../../../assets/images/borders/rail-pattern.png';

/**
  - background layer - full black, full width
  - foreground layer - has the dashed border
  - foreground layer - fully transparent ( covers background )
  - foreground layer - transforms to perfect circle centered and sized to the canvas


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
  */

class Frame extends Component {
  // state = {
  //   containerWidth: 100,
  //   containerHeight: 100,
  // };
  //
  // componentDidMount() {
  //   this.drawBackground();
  // }
  //
  // drawBackground() {
  //   this.canvasContext.fillStyle = brightGreen;
  //   this.canvasContext.fillRect(10, 10, 100, 100);
  // }
  //
  // canvas = null;
  // canvasContext = null;
  //
  // handleDocumentResize = ({ width, height }) => {
  //   this.setState({
  //     containerWidth: width,
  //     containerHeight: height,
  //   })
  // }

  render() {
    // const { containerWidth, containerHeight } = this.state;

    return (
      <div className="root">
        <div className="frame">
          <div className="top-rail" />
          <div className="left-rail" />
          <div className="right-rail" />
          <div className="bottom-rail" />
        </div>

        <div className="content">
          { this.props.children }
        </div>

        <style jsx>{`
          .root {
            font-family: ${monoFont};
            color: ${brightGreen};
            background-color: ${black};
            min-width: 100%;
            min-height: 100%;
            margin: 0;
            padding: 0;
          }

          .top-rail {
            background-image: url(${borderImage});
            background-repeat: repeat-y;
            background-size: 13px;
            border-left: 1px solid ${brightGreen};
            height: 100%;
            width: 13px;
            min-height: 800px;
          }
        `}</style>
      </div>
    );
  }
}

export default Frame;
