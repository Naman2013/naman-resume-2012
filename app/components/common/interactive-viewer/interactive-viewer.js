import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Draggable from 'react-draggable';
import { setImageDataToSnapshot } from '../../../modules/Telescope-Overview';
import './interactive-viewer.scss';

const ZOOM_MULTIPLIER = 0.5;
const MIN_ZOOM_SCALE = 1;
const MAX_ZOOM_SCALE = 3;
const FRAME_VIEW_TYPE_FULL = 'FRAME_VIEW_TYPE_FULL';
const FRAME_VIEW_TYPE_CIRCULAR = 'FRAME_VIEW_TYPE_CIRCULAR';
const BOUNDS_MULTIPLIER = 100;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setImageDataToSnapshot,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class InteractiveViewer extends Component {
  state = {
    fullScreenMode: false,
    clipped: true,
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
    },
  };

  /** event api's */
  handleToggleClipping = (event) => {
    event.preventDefault();
    const { clipped } = this.state;

    // set the new clipped state
    this.props.actions.setImageDataToSnapshot({ masked: !clipped });

    this.setState({
      clipped: !clipped,
      frameViewType: clipped ? FRAME_VIEW_TYPE_FULL : FRAME_VIEW_TYPE_CIRCULAR,
    });

  };

  toggleFullScreenMode = (event) => {
    event.preventDefault();
    const { fullScreenMode } = this.state;
    this.setState({
      fullScreenMode: !fullScreenMode,
    });

  };

  adjustXPos(event) {
    event.preventDefault();
    event.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x: x - 10, y } });
  }

  adjustYPos(event) {
    event.preventDefault();
    event.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
  }

  resetXY() {
    this.setState({ controlledPosition: { x: 0, y: 0 } });
  }

  onControlledDrag = (event, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  };

  onControlledDragStop(event, position) {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  }

  handleZoomOutClick = (event) => {
    event.preventDefault();
    const { currentScale } = this.state;
    let newScale = currentScale - ZOOM_MULTIPLIER;
    newScale = newScale >= MIN_ZOOM_SCALE ? newScale : MIN_ZOOM_SCALE;

    this.setState({
      currentScale: newScale,
      bounds: newScale / BOUNDS_MULTIPLIER,
    });

    this.resetXY();
  };


  handleZoomInClick = (event) => {
    event.preventDefault();
    const { currentScale } = this.state;
    const newScale = currentScale + ZOOM_MULTIPLIER;
    if (newScale <= MAX_ZOOM_SCALE) {
      this.setState({
        currentScale: newScale,
        bounds: newScale * BOUNDS_MULTIPLIER,
      });
    }
  };

  fetchCurrentPanelStyle() {
    return this.state.clipped ? {
      WebkitClipPath: 'circle(35% at 50% 47%)',
      MozClipPath: 'circle(35%)',
      clipPath: 'circle(35%, 50%, 47%)',
    } : {};
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.actions.setImageDataToSnapshot({
      zoom: nextState.currentScale,
      originX: nextState.controlledPosition.x,
      originY: nextState.controlledPosition.y,
    });
  }

  render() {
    const { children } = this.props;
    const { fullScreenMode, currentScale, frameViewType, bounds, controlledPosition } = this.state;

    const viewerContentStyle = {
      transform: `scale(${currentScale})`,
      transformStyle: 'flat',
    };

    const interactiveViewerContainerStyle = classnames('interactive-viewer-container', {
      __full__screen__mode: fullScreenMode,
    });

    const interactivePanelStyle = this.fetchCurrentPanelStyle();

    const draggableConfiguration = {
      bounds: {
        left: -bounds,
        top: -bounds / 2,
        bottom: bounds / 2,
        right: bounds,
      },
      position: controlledPosition,
      onDrag: this.onControlledDrag,
    };

    return (
      <div className={interactiveViewerContainerStyle}>

        <div style={interactivePanelStyle} className="interactive-viewer">

          <div
            className="interactive-panel"
          >

            <div
              id="interactive-content-container"
              style={viewerContentStyle}
              className="viewer-content"
            >

              <Draggable {...draggableConfiguration}>
                <div className="content">
                  {children}
                </div>
              </Draggable>

            </div>
          </div>
        </div>

        <button
          onClick={this.handleZoomOutClick}
          className="action minus"
        >
          <span className="icon glyphicon-minus" />
        </button>

        <button
          onClick={this.handleZoomInClick}
          className="action plus"
        >
          <span className="icon glyphicon-plus" />
        </button>

        <button
          onClick={this.toggleFullScreenMode}
          className="action full-screen-view"
        >
          Full-screen view <span className="icon glyphicon glyphicon-fullscreen" />
        </button>

        {
          frameViewType === FRAME_VIEW_TYPE_CIRCULAR ?
            <button
              onClick={this.handleToggleClipping}
              className="action circular-view"
            >
                Full-frame view <span className="icon glyphicon glyphicon-sound-stereo" />
            </button>
            :
            <button
              onClick={this.handleToggleClipping}
              className="action circular-view"
            >
                Circular view <span className="icon glyphicon glyphicon-record" />
            </button>
        }

      </div>
    );
  }
}

InteractiveViewer.defaultProps = {
  clipDimension: 305,
};

InteractiveViewer.propTypes = {
  clipDimension: PropTypes.number,
};

export default InteractiveViewer;
