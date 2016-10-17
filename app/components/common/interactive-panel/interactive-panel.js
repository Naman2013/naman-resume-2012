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

  /** control api */
  zoom(factor) {
    this.setState({
      currentZ: 0,
    });
  }

  pan(factor) {
    this.setState({
      currentX: 0,
      currentY: 0,
    });
  }

  /** event api's */
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

  handleMouseEnter(event) {}

  handleMouseLeave(event) {}

  render() {

    const { children } = this.props;

    return(
      <div
        mouseScroll={this.handleMouseScroll.bind(this)}
        mouseDown={this.handleMouseDown.bind(this)}
        mouseUp={this.handleMouseUp.bind(this)}
        mouseEnter={this.handleMouseEnter.bind(this)}
        mouseLeave={this.handleMouseLeave.bind(this)}
        className="interactive-panel">

        {children}

      </div>
    );
  }
}

export default InteractivePanel;
