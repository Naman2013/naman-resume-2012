import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('SVG Shapes', module).add('Experiment 1', () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <mask id="hole">
        <rect width="100%" height="100%" fill="white" />
        <circle r="20%" cx="50%" cy="50%" fill="black" />
      </mask>
    </defs>

    <rect id="portal" x="0" y="0" width="100%" height="100%" mask="url(#hole)" />
  </svg>
));
