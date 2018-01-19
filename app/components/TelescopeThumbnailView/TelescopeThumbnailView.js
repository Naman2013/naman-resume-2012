// TODO: fade in the top image

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVGClipView from '../VirtualTelescopeViewer/SVGClipView';

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
    startingOpacity: PropTypes.string.isRequired,
    fadeDuration: PropTypes.string.isRequired,
  };

  componentDidUpdate() {
    // we start this work when we are certain we have images to work on
    // const topImageAddress = this.generateThumbnailUrl(currentImageUrl);
    // const topDOMNode = document.getElementById(this.generateImageId());
    //
    // if (topImage) {
    //   topDOMNode.style.transition = 'opacity';
    //   topDOMNode.style.opacity = startingOpacity;
    //   topDOMNode.src = topImageAddress;
    //   window.getComputedStyle(topDOMNode, null).opacity;
    //   topDOMNode.style.transition = `opacity ${adjustedFade}s`;
    //   topDOMNode.style.opacity = '1';
    // }
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
            id={this.generateImageId()}
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
