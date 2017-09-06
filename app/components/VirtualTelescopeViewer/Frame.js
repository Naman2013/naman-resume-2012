import React, { Component } from 'react';
import ResponsiveContainer from '../ResponsiveContainer';
import { monoFont } from '../../styles/variables/fonts';
import { black, brightGreen } from '../../styles/variables/colors';
import borderImage from '../../../assets/images/borders/telescope-viewer-ticked-border.png';


class Frame extends Component {
  state = {
    containerWidth: 100,
    containerHeight: 100,
  };

  componentDidMount() {
    const drawingContext = this.canvas.getContext('2d');
  }

  canvas = null;

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
            ref={(canvas) => { this.canvas = canvas; }}
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
