import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Draggable from 'react-draggable';

import { setImageDataToSnapshot } from '../../../modules/starshare-camera/starshare-camera-actions';
import './interactive-viewer.scss';

const ZOOM_MULTIPLIER = 0.5;
const MIN_ZOOM_SCALE = 1;
const MAX_ZOOM_SCALE = 3;
const BOUNDS_MULTIPLIER = 100;

const ZOOM_FACTOR = 3250;
const ZOOM_THRESHOLD = 1.5;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setImageDataToSnapshot,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class InteractiveViewer extends Component {
  defaultProps = {
    isInteractive: true,
    callSource: 'details',
  }

  constructor(props) {
    super(props);

    if (props.isInteractive) {
      this.animationTick = setInterval(::this.handleViewerTick, 100);
    }
  }

  state = {
    fullScreenMode: false,
    clipped: this.props.isInteractive,
    currentScale: 1,
    bounds: 1,
    controlledPosition: {
      x: 0,
      y: 0,
    },
    timerTick: 0,
    zoomfactor: ZOOM_FACTOR,
    zoomEnabled: true,
  };


  componentWillUpdate(nextProps, nextState) {
    const { currentScale } = nextState;

    // TODO: sort out if we need to reset the image scale to 1
    this.props.actions.setImageDataToSnapshot({
      zoom: nextState.currentScale,
      originX: nextState.controlledPosition.x,
      originY: nextState.controlledPosition.y,
      callSource: nextProps.callSource,
    });
  }

  componentWillUnmount() {
    clearInterval(this.animationTick);
  }

  onControlledDrag = (event, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  };

  handleViewerTick() {
    this.autoZoomTick();
  }

  autoZoomTick() {
    const { zoomfactor, zoomEnabled, currentScale } = this.state;
    const newZoomenabled = (currentScale <= ZOOM_THRESHOLD);

    if (zoomEnabled) {
      this.setState(prevState => ({
        currentScale: prevState.currentScale + (prevState.currentScale / zoomfactor),
        zoomEnabled: newZoomenabled,
      }));
    }
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

  adjustXPos(event) {
    event.preventDefault();
    event.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x: x - 10, y } });
  }

  handleToggleClipping = (event) => {
    event.preventDefault();
    const { clipped } = this.state;

    // set the new clipped state
    this.props.actions.setImageDataToSnapshot({ masked: !clipped });

    this.setState({
      clipped: !clipped,
    });
  };

  handleZoomOutClick = (event) => {
    event.preventDefault();
    const { currentScale } = this.state;

    this.giveUserControl();

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

    this.giveUserControl();

    const newScale = currentScale + ZOOM_MULTIPLIER;
    if (newScale <= MAX_ZOOM_SCALE) {
      this.setState({
        currentScale: newScale,
        bounds: newScale * BOUNDS_MULTIPLIER,
      });
    }
  };

  fetchCurrentPanelStyle() {
    return Object.assign({
      cursor: this.props.isInteractive ? 'pointer' : 'default',
    }, this.state.clipped ? {
      WebkitClipPath: 'circle(35% at 50% 47%)',
      MozClipPath: 'circle(35%)',
      clipPath: 'circle(35%, 50%, 47%)',
    } : {});
  }

  giveUserControl() {
    this.setState({
      zoomEnabled: false,
    });
  }

  render() {
    const { children, isInteractive } = this.props;
    const {
      fullScreenMode,
      currentScale,
      clipped,
      bounds,
      controlledPosition,
    } = this.state;

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

        {isInteractive &&
          <button
            onClick={this.handleZoomOutClick}
            className="action minus"
          >
            <span className="icon glyphicon-minus" />
          </button>
        }

        {isInteractive &&
          <button
            onClick={this.handleZoomInClick}
            className="action plus"
          >
            <span className="icon glyphicon-plus" />
          </button>
        }

        {isInteractive &&
          <div>
            { clipped ?
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
              </button> }
            </div>
        }
      </div>
    );
  }
}

export default InteractiveViewer;
