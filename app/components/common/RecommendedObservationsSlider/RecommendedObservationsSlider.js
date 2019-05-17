/***********************************
 * V4 Recommended Observations Slider
 *
 *
 *
 ***********************************/
import React from 'react';
import take from 'lodash/fp/take';

import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import SloohSlider from 'app/components/common/Slider/ObservationsSlider';
import MobileSwiper from './partials/MobileSwiper';
import { getSliderProps } from './recommendedObservationsSliderConfiguration';

const Observations = props => {
  const { imageList } = props;
  const getImages = images => {
    return Object.values(images).filter(im => im.customerImageId);
  };
  const images = getImages(imageList);
  const sliderProps = images ? getSliderProps(images) : {};
  const shortList = take(images, 4) || [];

  return (
    <div className="root">
      <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
        <SloohSlider {...sliderProps} />
      </DisplayAtBreakpoint>
      <DisplayAtBreakpoint screenSmall>
        <MobileSwiper imagesList={shortList} />
      </DisplayAtBreakpoint>
      <style jsx>{`
        .root {
          margin: 0 auto;
          max-width: 620px;
        }
        @media only screen and (min-width: 1100px) {
          .root {
            max-width: 940px;
          }
        }
      `}</style>
    </div>
  );
};

export default Observations;
