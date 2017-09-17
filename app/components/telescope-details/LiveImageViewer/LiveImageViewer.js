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
    currentScale: 1,
  };

  zoomIn = (event) => {
    event.preventDefault();
    console.log('zooming');
  };

  zoomOut = (event) => {
    event.preventDefault();
    console.log('zooming');
  };


  render() {
    const { children } = this.props;

    return (
      <div className="root">
        {
          cloneElement(children, {
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
