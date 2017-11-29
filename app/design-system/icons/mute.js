import React from 'react';

export const Mute = () => (
  <div className="mute-root">
    <span className="fa fa-volume-down top" />
    <span className="fa fa-close bottom" />

    <style jsx>{`
      .mute-root {
        position: relative;
      }

      .bottom {
        position: absolute;
        left: 1px;
        top: 5px;
        color: red;
        font-size: 9px;
      }
    `}</style>
  </div>
);
