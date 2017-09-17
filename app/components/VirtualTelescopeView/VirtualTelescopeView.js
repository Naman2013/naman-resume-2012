import React from 'react';

import Rails from './Rails';

import { brightGreen } from '../../styles/variables/colors';

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
        margin: 0;
        padding: 0;
      }

      :global(.virtual-telescope-view-content-container img) {
        display: block;
        width: 100%;
        height: 100%;
      }

      .frame {
        position: relative;
        border: 1px solid ${brightGreen};
        padding: 0;
      }
    `}</style>
  </div>
);

export default VirtualTelescopeView;
