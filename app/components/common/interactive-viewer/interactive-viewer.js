import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Draggable from 'react-draggable';
import { setImageDataToSnapshot } from '../../../modules/Telescope-Overview';
import style from './interactive-viewer.scss';

const ZOOM_MULTIPLIER = 0.5;
const MINIMUM_ZOOM_SCALE = 1;
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
  constructor(props) {
    super(props);

    this.state = {
      fullScreenMode: false,
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
      },
    };
  }

  /** event api's */
  handleZoomInClick(event) {
    event.preventDefault();
    const { currentScale } = this.state;
    const newScale = currentScale + ZOOM_MULTIPLIER;
    this.setState({
      currentScale: newScale,
      bounds: newScale * BOUNDS_MULTIPLIER,
    });
  }

  handleZoomOutClick(event) {
    event.preventDefault();
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
    event.preventDefault();
    const { clipped, frameViewType } = this.state;

    // set the new clipped state
    this.props.actions.setImageDataToSnapshot({ masked: !clipped });

    this.setState({
      clipped: !clipped,
      frameViewType: clipped ? FRAME_VIEW_TYPE_FULL : FRAME_VIEW_TYPE_CIRCULAR,
    });
  }

  toggleFullScreenMode(event) {
    event.preventDefault();
    const { fullScreenMode } = this.state;
    this.setState({
      fullScreenMode: !fullScreenMode,
    });
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
      WebkitClipPath: `circle(35% at 50% 47%)`,
      MozClipPath: `circle(35%)`,
      clipPath: `circle(35%, 50%, 47%)`,
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
    const { children, clipDimension } = this.props;
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
      onDrag: this.onControlledDrag.bind(this),
    }

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
          onClick={this.toggleFullScreenMode.bind(this)}
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
