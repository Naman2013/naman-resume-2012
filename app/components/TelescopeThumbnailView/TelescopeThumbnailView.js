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
  return `/util/thumbnail.php?url=${sourceURL}&dimension=W&size=${DEFAULT_THUMB_WIDTH}`;
}

function generateDOMID(prefix, seed) {
  return `${prefix}-${seed}`;
}

class TelescopeThumbnailView extends Component {
  static propTypes = {
    topImageURL: PropTypes.string.isRequired,
    bottomImageURL: PropTypes.string.isRequired,
    startingOpacity: PropTypes.string.isRequired,
    fadeDuration: PropTypes.string.isRequired,
    teleId: PropTypes.string.isRequired,
  };

  componentDidUpdate() {
    const { topImageURL, startingOpacity, fadeDuration } = this.props;
    const topImageAddress = createThumbnailURL(topImageURL);
    const topDOMNode =
      window
        .document
        .getElementById(generateDOMID(DOM_ID_PREFIX, this.props.teleId));

    if (topDOMNode) {
      topDOMNode.style.transition = 'opacity';
      topDOMNode.style.opacity = startingOpacity;
      topDOMNode.src = topImageAddress;
      window.getComputedStyle(topDOMNode, null).opacity;
      topDOMNode.style.transition = `opacity ${fadeDuration}s`;
      topDOMNode.style.opacity = '1';
    }
  }

  generateImageId() {
    return `tele-id-${this.props.teleId}`;
  }

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
            id={generateDOMID(DOM_ID_PREFIX, this.props.teleId)}
          />
        </div>

        <style jsx>{`
          .root {
            display: inline-block;
            position: relative;
            border-radius: 50%;
            overflow: hidden;
          }

          .bottom-image {
            width: 250px;
            height: 250px
          }

          .top-image {
            width: 250px;
            height: 250px;
            position: absolute;
            top: 0;
            transition: opacity ease-in-out;
          }
        `}</style>
      </div>
    );
  }
}

export default TelescopeThumbnailView;
