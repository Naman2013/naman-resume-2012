import React from 'react';
import style from './SloohSunglasses.scss';

function SloohSunglasses() {
  return (
    <div className={style.sloohSunglassesWrapper}>
      <div className={style.container}>
        <div className={style.header}>
          Slooh Solar
          <br />
          Eclipse Sunglasses
        </div>
        <div className={style.description}>
          Be Prepared! Just in time for the Transcontinental Eclipse, Slooh is offering a limited number of specialty Slooh branded Eclipse Sunglasses. Made to filter out 100% of harmful ultra-violet, 100% of harmful infrared, and 99.999% of intense visible light, our premium filters create the sharpest solar images with an amazing and natural orange color.
        </div>
        <a
          href="https://www.amazon.com/s?marketplaceID=ATVPDKIKX0DER&me=A237ME1DXB1HVR&merchant=A237ME1DXB1HVR&redirect=true"
          target="_blank"
          className={style.actionBtn}
        >
          Get Yours Now
        </a>
      </div>
    </div>
  );
}

export default SloohSunglasses;
