import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import ClipView from './ClipView';
import Rails from './Rails';
import ViewerControlInterface from './ViewerControlInterface';

import { monoFont } from '../../styles/variables/fonts';
import { black, brightGreen } from '../../styles/variables/colors';

const propTypes = {
  clipped: PropTypes.bool,
  handleToggleClip: PropTypes.func,
  handleZoomIn: PropTypes.func,
  handleZoomOut: PropTypes.func,
  zoomLevel: PropTypes.number,
};

const defaultProps = {
  clipped: false,
  handleToggleClip: noop,
  handleZoomIn: noop,
  handleZoomOut: noop,
  zoomLevel: 1,
};

const VirtualTelescopeView = ({
  children,

  clipped,
  handleToggleClip,

  handleZoomIn,
  handleZoomOut,
  zoomLevel,
}) => (
  <div className="root">

    <div className="frame">
      <div className="virtual-telescope-view-content-container">
        <ClipView clipped={clipped}>
          { children }
        </ClipView>

        <Rails />
        <ViewerControlInterface
          clipped={clipped}
          handleToggleClip={handleToggleClip}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
        />
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

      .virtual-telescope-view-content-container {
        font-family: ${monoFont};
        color: ${brightGreen};
      }
    `}</style>
  </div>
);

VirtualTelescopeView.propTypes = propTypes;
VirtualTelescopeView.defaultProps = defaultProps;

export default VirtualTelescopeView;
