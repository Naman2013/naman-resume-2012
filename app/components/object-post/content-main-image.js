import React from 'react';
import style from './content-main-image.scss';

const ContentMainImage = ({ imageSource, authorName }) => {
  const containerStyle = {};
  return(
    <div className="content-main-image">
      <img width="100%" src={imageSource} />
      <p className="image-caption">Image by {authorName}, all rights reserved.</p>
    </div>
  );
};

export default ContentMainImage;
