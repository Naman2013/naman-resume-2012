import React, { Component, PropTypes, cloneElement } from 'react';

class PlaybackWrapper extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <h1>Navigation...</h1>
        {
          cloneElement(children)
        }
      </div>
    );
  }
}

export default PlaybackWrapper;
