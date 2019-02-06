/***********************************
* V4 Recommended Observations Slider
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import take from 'lodash/take';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';
import SloohSlider from 'components/common/Slider/ObservationsSlider';
import Request from 'components/common/network/Request';
import MobileSwiper from './partials/MobileSwiper';
import { SHARED_MEMBER_PHOTOS } from 'services/shared-photos';
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
