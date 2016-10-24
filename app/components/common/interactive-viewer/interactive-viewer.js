import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';
import style from './interactive-viewer.scss';

const ZOOM_MULTIPLIER = 0.5;
const MINIMUM_ZOOM_SCALE = 1;
const FRAME_VIEW_TYPE_FULL = 'FRAME_VIEW_TYPE_FULL';
const FRAME_VIEW_TYPE_CIRCULAR = 'FRAME_VIEW_TYPE_CIRCULAR';
const BOUNDS_MULTIPLIER = 100;

class InteractivePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clipped: false,
      currentScale: 1,
      frameViewType: FRAME_VIEW_TYPE_FULL,
      bounds: 1,
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0,
      },
      controlledPosition: {
        x: 0,
        y: 0,
      }
    };
  }

  /** event api's */
  handleZoomInClick(event) {
    const { currentScale } = this.state;
    const newScale = currentScale + ZOOM_MULTIPLIER;
    this.setState({
      currentScale: newScale,
      bounds: newScale * BOUNDS_MULTIPLIER,
    });

  }

  handleZoomOutClick(event) {
    const { currentScale } = this.state;
    let newScale = currentScale - ZOOM_MULTIPLIER;
    newScale = newScale >= MINIMUM_ZOOM_SCALE ? newScale : MINIMUM_ZOOM_SCALE;

    this.setState({
      currentScale: newScale,
      bounds: newScale / BOUNDS_MULTIPLIER,
    });

    this.resetXY();

  }

  handleToggleClipping(event) {
    const { clipped, frameViewType } = this.state;
    this.setState({
      clipped: !clipped,
      frameViewType: clipped ? FRAME_VIEW_TYPE_CIRCULAR : FRAME_VIEW_TYPE_FULL,
    });
  }

  handleGoingFullScreen(event) {
    console.log('go full screen');
  }

  adjustXPos(event) {
    event.preventDefault();
    event.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x: x - 10, y}});
  }

  adjustYPos(event) {
    event.preventDefault();
    event.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x, y: y - 10}});
  }

  resetXY() {
    this.setState({controlledPosition: {x: 0, y: 0}});
  }

  onControlledDrag(event, position) {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  }

  onControlledDragStop(event, position) {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  }

  fetchCurrentPanelStyle() {
    const { clipDimension } = this.props;
    return this.state.clipped ? {
      webkitClipPath: `circle(${clipDimension}px at center)`,
      mozClipPath: `circle(${clipDimension}px)`,
      clipPath: `circle(${clipDimension}px, ${clipDimension}px, ${clipDimension}px)`,
    } : {};
  }

  render() {

    const { children, clipDimension } = this.props;
    const { currentScale, frameViewType, bounds, controlledPosition } = this.state;

    const viewerContentStyle = {
      'transform': `scale(${currentScale})`,
      'transformStyle': 'flat',
    };

    const interactivePanelStyle = this.fetchCurrentPanelStyle();

    const draggableConfiguration = {
      bounds: {
        left: -bounds,
        top: -bounds / 2,
        bottom: bounds / 2,
        right: bounds,
      },
      position: controlledPosition,
      onDrag: this.onControlledDrag.bind(this),
    }

    return(
      <div className="interactive-viewer-container">

        <button
          onClick={this.handleZoomOutClick.bind(this)}
          className="action minus">
            <span className="icon glyphicon-minus"></span>
        </button>

        <button
          onClick={this.handleZoomInClick.bind(this)}
          className="action plus">
            <span className="icon glyphicon-plus"></span>
        </button>

        <button
          onClick={this.handleGoingFullScreen.bind(this)}
          className="action full-screen-view">
          Full-screen view <span className="icon glyphicon glyphicon-fullscreen"></span>
        </button>

        {
          frameViewType === FRAME_VIEW_TYPE_CIRCULAR ?
            <button
              onClick={this.handleToggleClipping.bind(this)}
              className="action circular-view">
                Full-frame view <span className="icon glyphicon glyphicon-sound-stereo"></span>
            </button>
            :
            <button
              onClick={this.handleToggleClipping.bind(this)}
              className="action circular-view">
                Circular view <span className="icon glyphicon glyphicon-record"></span>
            </button>
        }

        {/*
          TODO: work out how starshare images will be taken
          <button
            className="action snapshot">
            <img src={'/assets/images/icons/icon-snapshot.png'} className="icon snapshot" />
          </button>
        */}

        <div
          style={interactivePanelStyle}
          className="interactive-panel">

          <div
            id="interactive-content-container"
            style={viewerContentStyle}
            className="viewer-content">

            <Draggable { ...draggableConfiguration }>
              <div className="content">
                {children}
              </div>
            </Draggable>

          </div>

        </div>

      </div>
    );
  }
}

InteractivePanel.defaultProps = {
  clipDimension: 305,
};

InteractivePanel.propTypes = {
  clipDimension: PropTypes.number,
};

export default InteractivePanel;
