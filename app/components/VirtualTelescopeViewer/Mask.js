import React from 'react';
import classnames from 'classnames';
import { black } from '../../styles/variables/colors';

function getClasses() {}

const Mask = ({ isOpen }) => (
  <div className="mask">
    <style jsx>{`
      .mask {
        clip-path: circle(115px, 115px, 115px);
        border: 1px solid #f00;
        width: 100%;
        min-height: 100%;
        background: ${black};
      }
    `}</style>
  </div>
);

export default Mask;
