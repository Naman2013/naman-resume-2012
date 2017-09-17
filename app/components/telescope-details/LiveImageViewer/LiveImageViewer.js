import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const SCALE_MULTIPLIER = 0.5;
const MIN_SCALE = 1;
const MAX_SCALE = 3;
const SCALE_FACTOR = 3250;
const SCALE_THRESHOLD = 1.5;

const BOUNDS_MULTIPLIER = 100;

class LiveImageViewer extends Component {
  state = {
    scale: 1,
  };

  zoomIn = (event) => {
    event.preventDefault();
    const { scale } = this.state;
    if (scale < MAX_SCALE) {
      this.setState(prevState => ({
        scale: prevState.scale + SCALE_MULTIPLIER,
      }));
    }
  };

  zoomOut = (event) => {
    event.preventDefault();
  };


  render() {
    const { children } = this.props;
    const { scale } = this.state;

    return (
      <div className="root">
        {
          cloneElement(children, {
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
