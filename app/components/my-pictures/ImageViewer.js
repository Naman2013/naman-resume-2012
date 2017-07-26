import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { backgroundImageCover } from '../../styles/mixins/utilities';


class ImageViewer extends Component {

  render() {
    const {
      currentImage,
      error,
      fetching,
    } = this.props; // for galleries

    return (
      <div className="image-container">
        {fetching && <div className="message">Loading Image...</div>}
        {error && <div className="message">Could not get image .</div>}
        {(!fetching && !error) && <div
          className="image"
          style={{
            backgroundImage: `url(${currentImage})`
          }}
        />}
        <style jsx>
          {`
            .message {
              margin-top: 100px;
              text-align: center;
              height: 500px;
            }

            .image-container {
              width: 100%;
            }
            .image {
              ${backgroundImageCover}
              background-position: center;
              margin-bottom: 20px;
              display: block;
            }

            .image:before {
              display: block;
              content: "";
              width: 100%;
              padding-top: 68.49%;
            }
            .content {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
            }
          `}
        </style>
      </div>
    );
  }
}

ImageViewer.defaultProps = {
  actions: {},
};

ImageViewer.propTypes = {
  currentImage: PropTypes.string.isRequired,
};

export default ImageViewer;
