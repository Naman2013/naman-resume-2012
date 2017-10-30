import React from 'react';
import { brightGreen } from '../../styles/variables/colors';

const MissionProgressBar = () => (
  <div className="root">
    <style jsx>{`
      .root {
        border: 1px solid ${brightGreen};
        height: 100px;
        width: 5px;
      }
    `}</style>
  </div>
);

export default MissionProgressBar;
