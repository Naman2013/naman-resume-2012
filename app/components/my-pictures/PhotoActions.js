import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { white, turqoise, lightTurqoise, darkBlueGray } from '../../styles/variables/colors';
import { borderRadius } from '../../styles/mixins/utilities';

class PhotoActions extends Component {
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
    const {
      galleryList,
      imageURL
    } = this.props;

    return (
      <div className="">
        {/* <button className="action">
          <span className="fa fa-plus"></span>
        </button> */}
        <button onClick={this.handleDownloadPhotoClick} className="action">
          <span className="fa fa-download"></span>
        </button>
        <style jsx>
        {`
          .action {
            ${borderRadius('50%')}
            width: 35px;
            height: 35px;
            display: inline-block;
            border: none;
            background: ${turqoise};
            color: ${white};
            margin-right: 5px;
          }

          .action:hover {
            background: ${lightTurqoise};
            color: ${darkBlueGray};
          }

          .action:focus {
            outline: none;
          }

          .galleryList {
            top: -15px;
            height: 250px;
            width: 200px;
            position: absolute;
            z-index: 99999;
            background-color: ${white};
          }
        `}
        </style>
      </div>
    );
  }
}

PhotoActions.propTypes = {
  imageURL: PropTypes.string,
};

PhotoActions.defaultProps = {
  imageURL: '',
  galleryList: [],
};

export default PhotoActions;
