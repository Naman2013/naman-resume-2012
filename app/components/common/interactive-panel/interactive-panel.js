import React, { Component, PropTypes } from 'react';

class InteractivePanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentX: 0,
      currentY: 0,
      currentZ: 0,
    };
  }

  /**
    api
  */
  zoomIn(factor) {}

  zoomOut(factor) {}

  pan(factor) {}

  /**
    event api's
  */
  handleMouseScroll(event) {
    event.preventDefault();
    // TODO: zoom in or zoom out by step of scroll
  }

  handleMouseDown(event) {
    // TODO: control panning
  }

  handleMouseUp(event) {
    // TODO: tear down panning?
  }

  render() {
    return(
      <div
        mouseScroll={this.handleMouseScroll.bind(this)}
        mouseDown={this.handleMouseDown.bind(this)}
        mouseUp={this.handleMouseUp.bind(this)}
        className="interactive-panel">

      </div>
    );
  }
}

export default InteractivePanel;
