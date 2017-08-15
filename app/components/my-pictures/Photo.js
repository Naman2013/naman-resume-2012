import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-remarkable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import PhotoActions from './actions/PhotoActions';
import s from './Photo.scss';

const mapStateToProps = ({ galleries }) => ({
  // error: galleries.error,
  // errorBody: galleries.errorBody,
  // fetching: galleries.fetching,
  // galleryList: galleries.galleryList,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    // fetchGalleries,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Photo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      imageURL,
      handlePhotoClick,
      imageTitle,
      overlayText,
      detailsUrl,
      customerImageId,
    } = this.props;

    const inlinePhotoStyle = {
      backgroundImage: `url(${imageURL})`,
    };

    return (
      <div className={s.photoRoot}>
        <Link to={detailsUrl} className={s.photoLink} style={inlinePhotoStyle}>
          <div className={`${s.innerPhotoContainer} content`}>
            <h3 className={s.photoTitle}>{imageTitle}</h3>
            <div className={s.photoMarkdownContent}>
              {
                overlayText.map((markdownText, index) => <Markdown key={`markdown-text-${index}`} source={markdownText} />)
              }
            </div>
            <ul className={s.photoMenu}>
              <li>
                <PhotoActions imageURL={imageURL} customerImageId={customerImageId} />
              </li>
            </ul>
          </div>
        </Link>
      </div>
    );
  }
}

Photo.propTypes = {
  imageURL: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
  overlayText: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlePhotoClick: PropTypes.func.isRequired,
};

export default Photo;
