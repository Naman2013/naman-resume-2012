import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import noop from 'lodash/noop';

import ClipView from './ClipView';
import SubjectScaleControl from './SubjectScaleControl';
import Rails from './Rails';
import ViewerControlInterface from './ViewerControlInterface';

import { monoFont } from '../../styles/variables/fonts';
import { black, brightGreen } from '../../styles/variables/colors';

function calculateDraggableBounds(scale) {
  // bounds multiplier is set to 0 while scale is 1 to prevent movement at full size
  const BOUNDS_MULTIPLIER = (scale > 1) ? 100 : 0;
  const baseScale = BOUNDS_MULTIPLIER * scale;
  return {
    top: -baseScale,
    right: baseScale,
    bottom: baseScale,
    left: -baseScale,
  };
}

const propTypes = {
  children: PropTypes.node,
  clipped: PropTypes.bool,
  handleClip: PropTypes.func,
  handleZoomIn: PropTypes.func,
  handleZoomOut: PropTypes.func,
  activeZoomLevel: PropTypes.number,
  zoomRange: PropTypes.number,
  showInfoButton: PropTypes.bool,
  handleInfoClick: PropTypes.func,
  subjectScale: PropTypes.number,

  timestamp: PropTypes.number,
  coordinateArray: PropTypes.arrayOf(PropTypes.string),
  missionData: PropTypes.arrayOf(PropTypes.string),
  showMissionData: PropTypes.bool,
  objectTitleShort: PropTypes.string,
  processing: PropTypes.string,
  schedulingMember: PropTypes.string,

  onPositionChange: PropTypes.func,
};

const defaultProps = {
  children: null,
  clipped: false,
  handleClip: noop,
  handleZoomIn: noop,
  handleZoomOut: noop,
  activeZoomLevel: 0,
  zoomRange: 0,
  showInfoButton: false,
  handleInfoClick: noop,
  subjectScale: 1,

  timestamp: 0,
  coordinateArray: [],
  missionData: [],
  showMissionData: false,
  objectTitleShort: '',
  processing: '',
  schedulingMember: '',

  onPositionChange: noop,
};

class VirtualTelescopeView extends Component {
  state = {
    controlledPosition: {
      x: 0,
      y: 0,
    },
    viewerControlInterfaceOpacity: 1,
    zoomLevel: 0,
  };

  componentWillUpdate(nextProps, nextState) {
    this.props.onPositionChange({
      x: nextState.x,
      y: nextState.y,
    });
  }

  onDrag = (event, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  };

  resetDragLocation() {
    this.setState({
      controlledPosition: {
        x: 0,
        y: 0,
      },
    });
  }

  handleZoomIn = (event) => {
    this.resetDragLocation();
    this.props.handleZoomIn(event);
  };

  handleZoomOut = (event) => {
    this.resetDragLocation();
    this.props.handleZoomOut(event);
  };

  handleMouseEnterRoot = () => {
    this.setState({
      viewerControlInterfaceOpacity: 1,
    });
  };

  handleMouseLeaveRoot = () => {
    this.setState({
      viewerControlInterfaceOpacity: 0,
    });
  };

  render() {
    const {
      activeZoomLevel,
      children,
      clipped,
      handleClip,
      showInfoButton,
      handleInfoClick,
      zoomRange,
      subjectScale,
      timestamp,
      coordinateArray,
      missionData,
      showMissionData,
      objectTitleShort,
      processing,
      schedulingMember,
    } = this.props;

    const { viewerControlInterfaceOpacity, controlledPosition } = this.state;

    const viewControllerWrapperStyles = {
      opacity: viewerControlInterfaceOpacity,
    };

    return (
      <div
        onMouseEnter={this.handleMouseEnterRoot}
        onMouseLeave={this.handleMouseLeaveRoot}
        className="root"
      >

        <div className="frame">
          <div className="virtual-telescope-view-content-container">
            <ClipView clipped={clipped}>
              <Draggable
                bounds={calculateDraggableBounds(subjectScale)}
                handle={'.drag-handle'}
                position={controlledPosition}
                onDrag={this.onDrag}
              >
                <div className="drag-handle">
                  <SubjectScaleControl scale={subjectScale}>
                    { children }
                  </SubjectScaleControl>
                </div>
              </Draggable>
            </ClipView>

            <Rails />

            <div
              className="view-controller-wrapper"
              style={viewControllerWrapperStyles}
            >
              <ViewerControlInterface
                clipped={clipped}
                handleClip={handleClip}
                handleZoomIn={this.handleZoomIn}
                handleZoomOut={this.handleZoomOut}
                zoomRange={zoomRange}
                activeZoomLevel={activeZoomLevel}
                showInfoButton={showInfoButton}
                handleInfoClick={handleInfoClick}
                timestamp={timestamp}
                coordinateArray={coordinateArray}
                missionData={missionData}
                showMissionData={showMissionData}
                objectTitleShort={objectTitleShort}
                processing={processing}
                schedulingMember={schedulingMember}
              />
            </div>
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
            -moz-appearance: none;
            -webkit-appearance: none;
          }

          :global(.virtual-telescope-view-content-container .top-image) {
            position: absolute;
            top: 0;
            width: 100%;
          }

          .virtual-telescope-view-content-container {
            font-family: ${monoFont};
            color: ${brightGreen};
            cursor: move;
          }

          .view-controller-wrapper {
            transition: opacity .25s ease-in-out;
          }
        `}</style>
      </div>
    );
  }
}

VirtualTelescopeView.propTypes = propTypes;
VirtualTelescopeView.defaultProps = defaultProps;

export default VirtualTelescopeView;
