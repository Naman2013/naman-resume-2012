import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { backgroundImageCover } from '../../styles/mixins/utilities';


class ImageViewer extends Component {

  render() {
    const {
      imageURL,
    } = this.props.myPicturesImageDetails;

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
            backgroundImage: `url(${currentImage || imageURL})`
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
              width: 90%;
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
  currentImage: null,
  myPicturesImageDetails: {
    fetching: false,
    error: false,
    imageTitle: '',
    imageURL: '',
    zoom: 0,
    originx: 0,
    originy: 0,
    observationLog: '',
    shareToken: '',
    likesCount: 0,
    canLikeFlag: false,
    showLikePrompt: false,
    likePrompt: '',
    canDownloadFlag: false,
    canEditFlag: false,
    fileData: {},
  },
  actions: {},
};

ImageViewer.propTypes = {
  myPicturesImageDetails: PropTypes.shape({
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    imageTitle: PropTypes.string,
    imageURL: PropTypes.string,
    zoom: PropTypes.number,
    originx: PropTypes.number,
    originy: PropTypes.number,
    observationLog: PropTypes.string,
    shareToken: PropTypes.string,
    likesCount: PropTypes.number,
    canLikeFlag: PropTypes.bool,
    showLikePrompt: PropTypes.bool,
    likePrompt: PropTypes.string,
    canDownloadFlag: PropTypes.bool,
    canEditFlag: PropTypes.bool,
    fileData: PropTypes.shape({}),
  }),
};

export default ImageViewer;
