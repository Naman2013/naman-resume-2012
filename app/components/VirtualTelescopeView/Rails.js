import React from 'react';

import railBorderPattern from '../../../assets/images/borders/rail-pattern.png';
import runBorderPattern from '../../../assets/images/borders/run-pattern.png';

const Rails = () => (
  <div>
    <div className="top-rail" />
    <div className="left-rail" />
    <div className="right-rail" />
    <div className="bottom-rail" />

    <style jsx>{`
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

export default Rails;
