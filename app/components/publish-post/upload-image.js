import React, { Component, PropTypes } from 'react';
import ImageFile from './image-file';
import style from './upload-image.scss';

class UploadImage extends Component {
  // for documentation purposes...
  update(event) {
    event.preventDefault();
    this.setState({
      value: event.target.value,
      files: event.target.files
    });
  }

  render() {
    const { handleUploadImage, displayImages } = this.props;

    // TODO: map over the images and render ImageFile component
    // const images = [];
    // for (let i = 0; i < files.length; i++) {
    //   images.push(<ImageFile key={i} file={files[i]} />)
    // }

    return (
      <div>
        <i className="step-description">Upload JPEGS, GIFS, or PNGs here to add punch and meaning to your post</i>

        <div className="image-list-wrapper">
        {
          /**
          TODO: render image list...
            {images}
          */
        }
        </div>

        <label className="file-input-label">
          Browse for Image
          <input
            type="file"
            onChange={handleUploadImage}
            accept="image/*"
            multiple
          />
        </label>
      </div>
    )
  }
}

UploadImage.propTypes = {
  handleUploadImage: PropTypes.func.isRequired,
  displayImages: PropTypes.array.isRequired,
};

export default UploadImage;
