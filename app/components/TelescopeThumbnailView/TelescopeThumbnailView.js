import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TelescopeThumbnailView extends Component {
  static propTypes = {
    topImageURL: PropTypes.string.isRequired,
    bottomImageURL: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="root">
        <div className="bottom-image" />
        <div className="top-image" />
      </div>
    );
  }
}

export default TelescopeThumbnailView;
