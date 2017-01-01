import React, { Component } from 'react';
import ImageFile from './image-file';
import style from './upload-image.scss';

class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      files: []
    };

    this.update = this.update.bind(this);
  }

  update(e) {
    e.preventDefault();
    this.setState({
      value: e.target.value,
      files: e.target.files
    });
  }

  render() {
    const { files } = this.state;

    const images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(<ImageFile key={i} file={files[i]} />)
    }

    return (
      <div>
        <i className="step-description">Upload JPEGS, GIFS, or PNGs here to add punch and meaning to your post</i>
        <div className="image-list-wrapper">{images}</div>
        <label className="file-input-label">
          Browse for Image
          <input
            type="file"
            onChange={this.update}
            value={this.state.value}
            accept="image/*"
            multiple
          />
        </label>
      </div>
    )
  }
}

export default UploadImage;
