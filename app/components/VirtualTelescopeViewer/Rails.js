import React from 'react';

const Rails = () => (
  <div className="root">
    <div className="top-rail" />
    <div className="left-rail" />
    <div className="right-rail" />
    <div className="bottom-rail" />

    <style jsx>{`
      .root {
        width: 100%;
        height: 100%;
      }

      .top-rail,
      .bottom-rail,
      .left-rail,
      .right-rail {
        position: absolute;
      }

      .top-rail, .bottom-rail {
        background-image: url(/assets/images/borders/run-pattern.png);
        background-repeat: repeat-x;
        background-position: 1px;
        height: 13px;
        width: 100%;
      }

      .left-rail, .right-rail {
        background-image: url(/assets/images/borders/rail-pattern.png);
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
