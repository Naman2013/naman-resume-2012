import React from 'react';

const Mask = () => (
  <g>
    <defs>
      <mask id="hole">
        <rect width="100%" height="100%" fill="white" />
        <circle r="38%" cx="50%" cy="50%" fill="black" />
      </mask>
    </defs>

    <rect id="portal" x="0" y="0" width="100%" height="100%" mask="url(#hole)" />
  </g>
);

export default Mask;
