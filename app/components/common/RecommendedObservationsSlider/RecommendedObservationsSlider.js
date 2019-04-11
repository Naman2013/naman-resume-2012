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
import Request from 'app/components/common/network/Request';
import { SHARED_MEMBER_PHOTOS } from 'app/services/shared-photos';
import MobileSwiper from './partials/MobileSwiper';
import { getSliderProps } from './recommendedObservationsSliderConfiguration';

const Observations = () => (
  <Request
    serviceURL={SHARED_MEMBER_PHOTOS}
    method="POST"
    render={({ fetchingContent, serviceResponse }) => {
      const sliderProps = serviceResponse.imageList
        ? getSliderProps(serviceResponse.imageList)
        : {};
      const shortList = take(serviceResponse.imageList, 4) || [];

      return (
        <div className="root">
          <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
            <SloohSlider {...sliderProps} />
          </DisplayAtBreakpoint>
          <DisplayAtBreakpoint screenSmall>
            <MobileSwiper imagesList={shortList} />
          </DisplayAtBreakpoint>
        </div>
      );
    }}
  />
);

export default Observations;
