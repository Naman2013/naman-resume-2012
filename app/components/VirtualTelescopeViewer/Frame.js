import React, { Component } from 'react';
import { monoFont } from '../../styles/variables/fonts';
import { black, brightGreen } from '../../styles/variables/colors';
import borderImage from '../../../assets/images/borders/telescope-viewer-ticked-border.png';


class Frame extends Component {

  componentDidMount() {
    const drawingContext = this.canvas.getContext('2d');
  }

  canvas = null;

  render() {
    return (
      <div className="root">

        <canvas
          className="root"
          ref={(canvas) => { this.canvas = canvas; }}
        />

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
