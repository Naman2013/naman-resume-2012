import React from 'react';
import { brightGreen } from '../../styles/variables/colors';

const MissionTitle = () => (
  <div className="root">
    <h5 className="content">Mission title...</h5>

    <style jsx>{`
      .root {
        text-align: center;
        padding-bottom: 20px;
      }

      .content {
        border: 1px solid ${brightGreen};
        display: inline;
        padding: 0 15px;
      }
    `}</style>
  </div>
);

export default MissionTitle;
