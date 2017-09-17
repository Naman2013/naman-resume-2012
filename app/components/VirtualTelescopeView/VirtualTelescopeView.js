import React from 'react';

import { black, brightGreen } from '../../styles/variables/colors';
import railBorderPattern from '../../../assets/images/borders/rail-pattern.png';
import runBorderPattern from '../../../assets/images/borders/run-pattern.png';

const VirtualTelescopeView = ({ children }) => (
  <div className="root">
    { /** child content */ }

    { /** outer dashed border */ }
    <div className="frame">
      <div className="virtual-telescope-view-content-container">
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

      :global(.virtual-telescope-view-content-container img) {
        display: block;
        width: 100%;
        height: 100%;
      }

      .frame {
        position: relative;
        border: 1px solid ${brightGreen};
        padding: 0;
      }

      .top-rail,
      .bottom-rail,
      .left-rail,
      .right-rail {
        position: absolute;
      }

      .top-rail, .bottom-rail {
        background-image: url(${runBorderPattern});
        background-repeat: repeat-x;
        background-position: 1px;
        height: 13px;
        width: 100%;
      }

      .left-rail, .right-rail {
        background-image: url(${railBorderPattern});
        background-repeat: repeat-y;
        width: 13px;
        height: 100%;
      }

      .top-rail {
        top: 0;
        transform: rotate(180deg);
      }

      .left-rail {
        left: 0;
        top: 0;
      }

      .right-rail {
        right: 0;
        top: 0;
        transform: rotate(180deg);
      }

      .bottom-rail {
        bottom: 0;
      }
    `}</style>
  </div>
);

export default VirtualTelescopeView;
