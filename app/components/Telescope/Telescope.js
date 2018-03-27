import React from 'react';
import Polyline from '../SVG/Polyline';

const Telescope = () => (
  <div>
    <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <Polyline points="0,0 0,15" strokeWidth={5} />
    </svg>
  </div>
);

export default Telescope;
