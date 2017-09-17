import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import noop from 'lodash/noop';

import ClipView from './ClipView';
import SubjectScaleControl from './SubjectScaleControl';
import Rails from './Rails';
import ViewerControlInterface from './ViewerControlInterface';

import { monoFont } from '../../styles/variables/fonts';
import { black, brightGreen } from '../../styles/variables/colors';

const propTypes = {
  children: PropTypes.node,
  clipped: PropTypes.bool,
  handleClip: PropTypes.func,
  handleZoomIn: PropTypes.func,
  handleZoomOut: PropTypes.func,
  subjectScale: PropTypes.number,
  timestamp: PropTypes.number,
};

const defaultProps = {
  children: null,
  clipped: false,
  handleClip: noop,
  handleZoomIn: noop,
  handleZoomOut: noop,
  subjectScale: 1,
  timestamp: 0,
};

const VirtualTelescopeView = ({
  children,

  clipped,
  handleClip,

  handleZoomIn,
  handleZoomOut,

  subjectScale,

  timestamp,
}) => (
  <div className="root">

    <div className="frame">
      <div className="virtual-telescope-view-content-container">
        <ClipView clipped={clipped}>
          <Draggable
            handle={'.drag-handle'}
          >
            <div className="drag-handle">
              <SubjectScaleControl scale={subjectScale}>
                { children }
              </SubjectScaleControl>
            </div>
          </Draggable>
        </ClipView>

        <Rails />
        <ViewerControlInterface
          clipped={clipped}
          handleClip={handleClip}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          timestamp={timestamp}
        />
      </div>
    </div>

    <style jsx>{`
      .root {
        background-color: ${black};
        margin: 0;
        padding: 0;
        overflow: hidden;
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
        cursor: move;
      }
    `}</style>
  </div>
);

VirtualTelescopeView.propTypes = propTypes;
VirtualTelescopeView.defaultProps = defaultProps;

export default VirtualTelescopeView;
