import React from 'react';

import Rails from './Rails';

import { black, brightGreen } from '../../styles/variables/colors';

const VirtualTelescopeView = ({ children }) => (
  <div className="root">

    <div className="frame">
      <div className="virtual-telescope-view-content-container">
        { children }
        <Rails />
      </div>
    </div>

    <style jsx>{`
      .root {
        background-color: ${black};
        margin: 0;
        padding: 0;
      }

      .frame {
        position: relative;
        min-height: 500px;
        border: 1px solid ${brightGreen};
        padding: 0;
      }

      :global(.virtual-telescope-view-content-container img) {
        display: block;
        width: 100%;
        height: 100%;
      }
    `}</style>
  </div>
);

export default VirtualTelescopeView;
