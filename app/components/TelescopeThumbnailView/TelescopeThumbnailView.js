import React, { Component } from 'react';
import PropTypes from 'prop-types';

function createCSS(imageURL) {
  return {
    backgroundImage: `url(${imageURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  };
}

class TelescopeThumbnailView extends Component {
  static propTypes = {
    topImageURL: PropTypes.string.isRequired,
    bottomImageURL: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        <div className="root">
          <div
            style={createCSS(this.props.bottomImageURL)}
            className="bottom-image"
          />
          <div
            style={createCSS(this.props.topImageURL)}
            className="top-image"
          />
        </div>

        <style jsx>{`
          .root {
            width: 100%;
            height: 100%;
          }

          .bottom-image {
            width: 250px;
            height: 250px
          }
          .top-image {
            width: 250px;
            height: 250px;
          }
        `}</style>
      </div>
    );
  }
}

export default TelescopeThumbnailView;
