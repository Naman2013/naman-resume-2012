/***********************************
* V4 Recommended Observations Slider
*
*
*
***********************************/
import React from 'react';
import take from 'lodash/take';
import DisplayAtBreakpoint from '../../../components/common/DisplayAtBreakpoint';
import SloohSlider from '../../../components/common/Slider/ObservationsSlider';
import Request from '../../../components/common/network/Request';
import { screenMedium, screenLarge } from '../../../styles/variables/breakpoints';
import { SHARED_MEMBER_PHOTOS } from '../../../services/shared-photos';
import MobileSwiper from './partials/MobileSwiper';
import { getSliderProps } from './recommendedObservationsSliderConfiguration';

const Observations = () => (
  <Request
    serviceURL={SHARED_MEMBER_PHOTOS}
    method="POST"
    render={({
      fetchingContent,
      serviceResponse,
    }) => {
      const sliderProps = serviceResponse.imageList ? getSliderProps(serviceResponse.imageList) : {};
      const shortList = take(serviceResponse.imageList, 4) || [];

      console.log(sliderProps);

      return (
        <div className="root">
          <DisplayAtBreakpoint
            screenMedium
            screenLarge
            screenXLarge
          >
            <div className="obs-slider-wrapper">
              <SloohSlider {...sliderProps} />
            </div>
          </DisplayAtBreakpoint>
          <DisplayAtBreakpoint
            screenSmall
          >
            <MobileSwiper
              imagesList={shortList}
            />
          </DisplayAtBreakpoint>
          <style jsx>
            {`
              @media ${screenMedium} {
                :global(.obs-slider-wrapper .slick-list) {
                  z-index: 100;
                }
              }

              @media ${screenLarge} {
                :global(.obs-slider-wrapper .slick-list) {
                  z-index: auto;
                }
              }
            `}
          </style>
        </div>
      );
    }}
  />);

export default Observations;
