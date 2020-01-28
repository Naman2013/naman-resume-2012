import React from 'react';
import './styles.scss';

export const MultiUploadImageItem = ({ image, onDeleteImage }) => {
  return (
    <div className="multi-upload-image-item">
      <div
        className="image-container"
        style={{ background: `url("${image}")` }}
      >
        <i
          className="fa fa-close image-container-close"
          onClick={() => onDeleteImage(image)}
        />
      </div>
    </div>
  );
};
