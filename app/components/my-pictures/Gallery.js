import Markdown from 'react-remarkable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { backgroundImageCover } from '../../styles/mixins/utilities';
import { white, pink } from '../../styles/variables/colors';

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators({
//   }, dispatch),
// });
//
// @connect(null, mapDispatchToProps)
class Gallery extends Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    imageTitle: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
  }

  static defaultProps = {
    created: 0
  }

  render() {
    const {
      isImages,
      galleryId,
      overlayText,
      created,
      imageURL,
      imageTitle,
      customerImageId,
      shareToken
    } = this.props;
    const createdDate = moment(Number(created) * 1000);
    const url = isImages ? `/my-pictures/gallery/${galleryId}/show-image/${customerImageId}/${shareToken}` : `/my-pictures/galleries/${galleryId}`;
    return (
      <div>
        <Link to={url} className="gallery-container-image" style={{ backgroundImage: `url(${imageURL})` }}>
          <div className="innerContainer content">
            <div>{imageTitle}</div>
            <div>Created on {createdDate.format('dddd, MMMM Do YYYY')}</div>
            {
              overlayText && overlayText.map((markdownText, index) => <Markdown key={`markdown-text-${index}`} source={markdownText} />)
            }
          </div>
          <style jsx>
            {`

              .content {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
              }

              .innerContainer {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                color: ${white};
                padding: 20px;
                opacity: 0;
              }
            `}
          </style>
          <style jsx global>
            {`

              .gallery-container-image {
                ${backgroundImageCover}
                background-position: center;
                margin-bottom: 20px;
                display: block;
                border: 4px solid transparent;
              }

              .gallery-container-image:before {
                display: block;
                content: "";
                width: 100%;
                padding-top: 68.49%;
              }

              .gallery-container-image:hover {
                border: 4px solid ${pink};
              }

              .gallery-container-image:hover .innerContainer {
                opacity: 1;
              }

            `}
          </style>
        </Link>
      </div>
    );
  }
}

export default Gallery;
