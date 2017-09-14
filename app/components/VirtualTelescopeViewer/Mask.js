import React from 'react';
import classnames from 'classnames';
import { black } from '../../styles/variables/colors';

function getClasses() {}

const Mask = ({ isOpen, children }) => (
  <div className="mask">
    <div className="container">
      { children }
    </div>
    <style jsx>{`
      .container {
        min-width: 100%;
        min-height: 100%;
        position:absolute;
        left: 0;
        top: 0;
        border: 2px solid #f00;
      }

      .mask {
        border: 1px solid #f00;
        width: 100%;
        min-height: 100%;
        background: ${black};
      }
    `}</style>
  </div>
);

export default Mask;

// clip-path: circle(30% at center);
