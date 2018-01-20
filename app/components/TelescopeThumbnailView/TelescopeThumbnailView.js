// TODO: fade in the top image

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_THUMB_WIDTH = '245';
const DOM_ID_PREFIX = 'telescope-thumb';

function createCSS(imageURL) {
  return {
    backgroundImage: `url(${imageURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  };
}

function createThumbnailURL(sourceURL) {
  return `https://slooh.com/util/thumbnail.php?url=${sourceURL}&dimension=W&size=${DEFAULT_THUMB_WIDTH}`;
}

class TelescopeThumbnailView extends Component {
  static propTypes = {
    topImageURL: PropTypes.string.isRequired,
    bottomImageURL: PropTypes.string.isRequired,
    startingOpacity: PropTypes.string.isRequired,
    fadeDuration: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.transitionTopImage(this.topImageNode);
  }

  componentDidUpdate() {
    this.transitionTopImage(this.topImageNode);
  }

  transitionTopImage(targetNode) {
    const { startingOpacity, fadeDuration } = this.props;
    if (targetNode) {
      targetNode.style.transition = 'opacity';
      targetNode.style.opacity = startingOpacity;
      window.getComputedStyle(targetNode, null).opacity;
      targetNode.style.transition = `opacity ${fadeDuration}s`;
      targetNode.style.opacity = '1';
    }
  }

  render() {
    const {
      topImageURL,
      bottomImageURL,
    } = this.props;

    const topThumbServiceURL = createThumbnailURL(topImageURL);
    const bottomThumbServiceURL = createThumbnailURL(bottomImageURL);

    this.transitionTopImage();

    return (
      <div>
        <div className="root">
          <div
            style={createCSS(bottomThumbServiceURL)}
            className="bottom-image"
          />
          <div
            style={createCSS(topThumbServiceURL)}
            className="top-image"
            ref={(topImageNode) => { this.topImageNode = topImageNode; }}
          />
        </div>

        <style jsx>{`
          .root {
            display: inline-block;
            position: relative;
          }

          .bottom-image {
            width: 245px;
            height: 245px
            border-radius: 50%;
          }

          .top-image {
            width: 250px;
            height: 250px;
            position: absolute;
            top: 0;
            transition: opacity ease-in-out;
            border-radius: 50%;
          }
        `}</style>
      </div>
    );
  }
}

export default TelescopeThumbnailView;
