import Markdown from 'react-remarkable';
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import PhotoActions from './actions/PhotoActions';
import { backgroundImageCover } from '../../styles/mixins/utilities';
import { white, pink } from '../../styles/variables/colors';

const mapStateToProps = ({ user }) => ({
  user,
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Gallery extends Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    imageTitle: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    canShareFlag: PropTypes.bool,
    canEditFlag: PropTypes.bool,
    isImages: PropTypes.bool,
    galleryId: PropTypes.number,
    overlayText: PropTypes.arrayOf(PropTypes.string),
    customerImageId: PropTypes.number,
    shareToken: PropTypes.string,
    isPublicGallery: PropTypes.bool,
  }

  static defaultProps = {
    created: null,
    galleryId: null,
    isImages: false,
    canEditFlag: false,
    overlayText: [],
    customerImageId: null,
    shareToken: '',
    isPublicGallery: false,
  }

  state = {
    showHoverMenu: false,
  }

  showMenu = () => {
    this.setState({
      showHoverMenu: true,
    });
  }

  hideMenu = () => {
    this.setState({
      showHoverMenu: false,
    });
  }

  render() {
    const {
      canEditFlag,
      canShareFlag,
      isImages,
      galleryId,
      overlayText,
      created,
      imageURL,
      imageTitle,
      customerImageId,
      shareToken,
      user,
      isPublicGallery
    } = this.props;

    const {
      showHoverMenu
    } = this.state;
    const createdDate = moment(Number(created) * 1000);
    const url = isImages || isPublicGallery ? `/my-pictures/gallery/${galleryId}/show-image/${customerImageId}/${shareToken}` : `/my-pictures/galleries/${galleryId}`;
    const hoverStyle = classnames({
      showMenu: showHoverMenu
    });

    return (
      <div>
        <Link to={url} className="gallery-container-image" style={{ backgroundImage: `url(${imageURL})` }}>
          <div
            className={`innerContainer content ${hoverStyle}`}
            onMouseOver={this.showMenu}
            onMouseLeave={this.hideMenu}
          >
            <div>{imageTitle}</div>
            {created && <div>Created on {createdDate.format('dddd, MMMM Do YYYY')}</div>}
            {
              overlayText && overlayText.map((markdownText, index) => <Markdown key={`markdown-text-${index}`} source={markdownText} />)
            }
            {!isPublicGallery && <ul className="photoMenu">
              <li>
                <PhotoActions
                  canShareFlag={canShareFlag}
                  canEditFlag={canEditFlag}
                  imageURL={imageURL}
                  customerImageId={customerImageId}
                  user={user}
                  actionSource={isImages ? 'galleryPictures' : 'galleries'}
                  galleryId={galleryId}
                />
              </li>
            </ul>}
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

              .showMenu.innerContainer {
                opacity: 1;
              }

              .photoMenu {
                list-style-type: none;
                position: absolute !important;
                right: 35px;
                bottom: 25px;
              }

            `}
          </style>
        </Link>
      </div>
    );
  }
}

export default Gallery;
