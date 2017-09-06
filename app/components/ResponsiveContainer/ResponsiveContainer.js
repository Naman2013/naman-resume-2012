import React, { Component } from 'react';

/**
  - component mounts and binds an event listener
  - component records its own width and height and provides it to the child
*/

class ResponsiveContainer extends Component {
  state = {
    width: 0,
    height: 0,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleWindowResize() {
    // update the current width of the element into the internal state
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default ResponsiveContainer;
