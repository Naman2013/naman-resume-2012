import React from 'react';

import { black, brightGreen } from '../../styles/variables/colors';
import railBorderPattern from '../../../assets/images/borders/rail-pattern.png';
import runBorderPattern from '../../../assets/images/borders/run-pattern.png';

const VirtualTelescopeView = ({ children }) => (
  <div className="root">
    { /** child content */ }

    { /** outer dashed border */ }
    <div className="frame">
      <div className="content-container">
        { children }
      </div>
      <div className="top-rail" />
      <div className="left-rail" />
      <div className="right-rail" />
      <div className="bottom-rail" />
    </div>

    <style jsx>{`
      .root {
        margin: 0;
        padding: 0;
      }

      .frame {
        position: relative;
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
        position: absolute;
        top: 0;
        transform: rotate(180deg);
      }

      .left-rail {
        position: absolute;
        left: 0;
        top: 0;
      }

      right-rail {
        position: absolute;
        right: 0;
        top: 0;
      }

      .bottom-rail {
        position: absolute;
        bottom: 0;
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
    `}</style>
  </div>
);

export default VirtualTelescopeView;
