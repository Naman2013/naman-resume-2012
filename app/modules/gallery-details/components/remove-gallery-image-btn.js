import React from 'react';
import './remove-gallery-image-btn.scss';

export const RemoveGalleryImageBtn = ({
  removeImageFromGallery,
  customerImageId,
  galleryId,
  label,
}) => (
  <div
    className="remove-gallery-image-btn"
    onClick={() => removeImageFromGallery({ galleryId, customerImageId })}
  >
    {label}
  </div>
);
