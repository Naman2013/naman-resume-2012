// @flow

import React from 'react';
import { Tooltip } from 'react-tippy';
import './upload-img-thumb.scss';

type TUploadImgThumb = {
  src: string,
  onDelete: Function,
};

export const UploadImgThumb = (props: TUploadImgThumb) => {
  const { src, onDelete } = props;
  return (
    <div className="upload-img-thumb">
      <div className="close-btn">
        <Tooltip title="Delete">
          <span className="icon-close" onClick={onDelete} role="presentation" />
        </Tooltip>
      </div>

      <img src={src} alt="" />
    </div>
  );
};
