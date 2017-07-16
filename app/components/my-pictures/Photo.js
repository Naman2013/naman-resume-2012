import React, { Component, PropTypes } from 'react';
import Markdown from 'react-remarkable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGalleries } from '../../modules/my-pictures/actions';

import { Link } from 'react-router';
import PhotoActions from './PhotoActions';
import s from './Photo.scss';

const mapStateToProps = ({ myPictures }) => ({
  error: myPictures.galleries.error,
  errorBody: myPictures.galleries.errorBody,
  fetching: myPictures.galleries.fetching,
  galleryList: myPictures.galleries.response.galleryList,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGalleries,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Photo extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.fetchGalleries({});
  }

  render() {
    const {
      imageURL,
      handlePhotoClick,
      imageTitle,
      overlayText,
      detailsUrl,
      galleryList,
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
                <PhotoActions imageURL={imageURL} galleryList={galleryList} />
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
