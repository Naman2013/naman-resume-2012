import React, { Component, PropTypes } from 'react';
import Markdown from 'react-remarkable';
import { Link } from 'react-router';
import s from './Photo.scss';

class Photo extends Component {
  constructor(props) {
    super(props);

    this.handleDownloadPhotoClick = this.handleDownloadPhotoClick.bind(this);
  }

  handleDownloadPhotoClick(event) {
    event.preventDefault();
    const { imageURL } = this.props;
    window.open(imageURL);
  }

  render() {
    const { imageURL, handlePhotoClick, imageTitle, overlayText } = this.props;

    const inlinePhotoStyle = {
      backgroundImage: `url(${imageURL})`,
    };

    return (
      <div className={s.photoRoot}>
        <Link onClick={handlePhotoClick} className={s.photoLink} style={inlinePhotoStyle} to="">
          <div className={`${s.innerPhotoContainer} content`}>
            <h3 className={s.photoTitle}>{imageTitle}</h3>
            <div className={s.photoMarkdownContent}>
              {
                overlayText.map((markdownText, index) => <Markdown key={`markdown-text-${index}`} source={markdownText} />)
              }
            </div>
            <ul className={s.photoMenu}>
              <li>
                <button onClick={this.handleDownloadPhotoClick} className={s.action}>
                  <span className="fa fa-download"></span>
                </button>
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
