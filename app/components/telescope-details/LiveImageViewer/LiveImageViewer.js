import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

const propTypes = {
  children: PropTypes.node,
  onZoomChange: PropTypes.func,
};

const defaultProps = {
  children: null,
  onZoomChange: noop,
};

const SCALE_MULTIPLIER = 0.5;
const MIN_SCALE = 1;
const MAX_SCALE = 3;
const SCALE_FACTOR = 3250;
const SCALE_THRESHOLD = 1.5;

class LiveImageViewer extends Component {
  state = {
    scale: 1,
    clipped: true,
  };

  componentWillUpdate(nextProps, nextState) {
    this.props.onZoomChange(nextState.scale);
  }

  zoomIn = (event) => {
    event.preventDefault();
    const { scale } = this.state;
    if (scale < MAX_SCALE) {
      this.adjustZoom(SCALE_MULTIPLIER);
    }
  };

  zoomOut = (event) => {
    event.preventDefault();
    const { scale } = this.state;
    if (scale > MIN_SCALE) {
      this.adjustZoom(-SCALE_MULTIPLIER);
    }
  };

  adjustZoom(scaleAdjustment) {
    this.setState(prevState => ({
      scale: prevState.scale + scaleAdjustment,
    }));
  }

  handleClip = ({ clip }) => {
    this.setState({
      clipped: clip,
    });
  }


  render() {
    const { children } = this.props;
    const { scale, clipped } = this.state;

    return (
      <div className="root">
        {
          cloneElement(children, {
            clipped,
            handleClip: this.handleClip,
            subjectScale: scale,
            handleZoomIn: this.zoomIn,
            handleZoomOut: this.zoomOut,
          })
        }
      </div>
    );
  }
}

LiveImageViewer.propTypes = propTypes;
LiveImageViewer.defaultProps = defaultProps;

export default LiveImageViewer;
