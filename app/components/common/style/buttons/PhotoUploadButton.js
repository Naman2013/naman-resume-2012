import React from 'react';
import PropTypes from 'prop-types';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const PhotoUploadButton = ({
  text,
  icon,
  handleUploadImage,
}) => (
  <div className="button-input-container">
    <label for="file-upload">
      <div
        className="button-container"
      >
        <div className="button-inner-container">
          <span className="button-text fa fa-image" />
          <div className="button-text">
            <span className="fa fa-plus" />
            <span className="text" dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        </div>
      </div>
    </label>
    <input
      id="file-upload"
      type="file"
      className="upload-button"
      onChange={handleUploadImage}
      accept="image/*"
    />
    <style jsx>
      {`
        input[type="file"] {
          display: none;
        }
        .button-text {
          margin: 0 5px;
        }
        .button-input-container {
          position: relative;
        }

        .button-inner-container {
          display: flex;
          margin: auto;
          justify-content: space-between;
        }
        .text {
          vertical-align: middle;

        }

        .fa-image {
          font-size: 13px;
        }
        .button-container {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          border: 1px dashed ${astronaut};
          background-color: transparent;
          border-radius: 100px;
          width: 110px;
          margin: 15px 0;
          font-size: 11px;
          font-weight: bold;
          padding: 5px 0;
          text-transform: uppercase;
          width: 120px;
          height: 40px;
        }
      `}
    </style>
  </div>
);

PhotoUploadButton.propTypes = {
  text: string,
  handleUploadImage: func.isRequired,
};
PhotoUploadButton.defaultProps = {
  text: 'Photo',
};

export default PhotoUploadButton;
