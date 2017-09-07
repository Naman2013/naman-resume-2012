import React, { Component } from 'react';
import { monoFont } from '../../styles/variables/fonts';
import { black, brightGreen } from '../../styles/variables/colors';

import railBorderPattern from '../../../assets/images/borders/rail-pattern.png';
import runBorderPattern from '../../../assets/images/borders/run-pattern.png';

class Frame extends Component {
  render() {
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
            position: relative;
            min-width: 100%;
            min-height: 100%;
            margin: 0;
            padding: 0;
          }

          .frame {
            border: 1px solid ${brightGreen};
          }

          .top-rail, .bottom-rail {
            background-image: url(${runBorderPattern});
            background-repeat: repeat-x;
            background-position: 1px;
            height: 13px;
            width: 100%;
          }

          .top-rail {
            transform: rotate(180deg);
          }

          .bottom-rail {
            clear: left;
          }

          .left-rail, .right-rail {
            background-image: url(${railBorderPattern});
            background-repeat: repeat-y;
            width: 13px;
            height: 100%;
            min-height: 600px;
          }

          .left-rail {
            float: left;
          }

          .right-rail {
            float: right;
            transform: rotate(180deg);
          }

          .content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}

export default Frame;
