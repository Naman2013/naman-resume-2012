/***********************************
 * V4 Recommended Observations Slider
 *
 *
 *
 ***********************************/
import React, { useState } from 'react';
import take from 'lodash/take';

import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import SloohSlider from 'app/components/common/Slider/ObservationsSlider';
import { useTranslation } from 'react-i18next';
import MobileSwiper from './partials/MobileSwiper';
import { getSliderProps } from './recommendedObservationsSliderConfiguration';

const Observations = props => {
  const { imageList, readOnly } = props;
  const getImages = images => {
    return Object.values(images).filter(im => im.customerImageId);
  };
  const { t } = useTranslation();
  const images = getImages(imageList);
  const [imagesCount, addImage] = useState(5);
  const longList = take(images, imagesCount) || [];
  const sliderProps = images ? getSliderProps(longList, t, readOnly) : {};
  const shortList = take(images, 4) || [];
  const sliderChange = index => {
    if (index > imagesCount - 3) {
      addImage(imagesCount + 1);
    }
  };

  return (
    <div className="root">
      <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
        <SloohSlider {...sliderProps} sliderChange={sliderChange} />
      </DisplayAtBreakpoint>
      <DisplayAtBreakpoint screenSmall>
        <MobileSwiper imagesList={shortList} readOnly={readOnly} />
      </DisplayAtBreakpoint>
      <style jsx>{`
        .root {
          margin: 0 auto;
          max-width: 780px;
        }
        @media only screen and (min-width: 1200px) {
          .root {
            max-width: 1180px;
          }
        }
      `}</style>
    </div>
  );
};

export default Observations;
