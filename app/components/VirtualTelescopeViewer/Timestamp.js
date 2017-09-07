import React from 'react';

import { brightGreen } from '../../styles/variables/colors';

const Timestamp = ({ timestamp }) => (
  <div className="root">
    <h5 className="content">2017-7-16T02:33UTC</h5>

    <style jsx>{`
      .root {
        margin-top: 15px;
      }

      .content {
        border: 1px solid ${brightGreen};
        padding: 0 5px;
        margin: 0;
      }
    `}</style>
  </div>
);

export default Timestamp;
