import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './style.scss';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import Dots from 'app/atoms/icons/Dots';

type ImageSlotProps = {
  imageOrderingModule: any;
};

export const ImageSlot: React.FC<ImageSlotProps> = props => {
  const [imageState, editImage] = useState(false);
  const { imageOrderingModule } = props;
  const { correctText, outputDownloadURL } = imageOrderingModule;

  return (
    <div>
      <div className="montage-slot">
        <div className="montage-slot__body slot-card">
          <div className="slot-card__left">
            <div className="slot-card__left__img">
              <img
                src="https://vega.slooh.com/icons/sharing/slooh_logo_sky_Square.jpg"
                alt=""
              />
            </div>
            <div className="slot-card__left__title">
              Auctor elit sed vulputate mi sit amet. Lobortis mattis aliquam
              faucibus purus in massa tempor nec.
            </div>
          </div>
          <div className="slot-card__right">
            <div className="slot-card__right__img">
              {imageState ? (
                <img src={outputDownloadURL} alt="" />
              ) : (
                <img src={outputDownloadURL} alt="" />
              )}
            </div>
            <div className="slot-card__right__action">
              <Button className="edit" onClick={() => editImage(!imageState)}>
                {imageState ? 'Find Image' : 'Edit Image'}
              </Button>
              <Button onClick={() => {}} className="dots-btn">
                <Dots theme={{ circleColor: astronaut }} />
              </Button>
            </div>
          </div>
        </div>
        <div className="montage-slot__footer">
          {imageState ? (
            <div className="find-image-title">
              CLICK `FIND IMAGE` TO SELECT AN IMAGE FOR THIS SLOT
            </div>
          ) : (
            <div className="notification-title">{correctText}</div>
          )}
        </div>
      </div>
    </div>
  );
};
