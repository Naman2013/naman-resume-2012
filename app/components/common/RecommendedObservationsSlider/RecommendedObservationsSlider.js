/***********************************
* V4 Recommended Observations Slider
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import take from 'lodash/take';
import has from 'lodash/has';
import RecommendedObservationSliderItem from './partials/RecommendedObservationsSliderItem';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import SloohSlider from 'components/common/Slider/ObservationsSlider';
import Request from 'components/common/network/Request';
import { SHARED_MEMBER_PHOTOS } from 'services/shared-photos';
// import { secondaryFont } from 'styles/variables/fonts';
import { getSliderProps } from './recommendedObservationsSliderConfiguration';
const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const Observations = () => (
  <Request
    serviceURL={SHARED_MEMBER_PHOTOS}
    method="POST"
    render={({
      fetchingContent,
      serviceResponse,
    }) => {
      const sliderProps = serviceResponse.imageList ? getSliderProps(serviceResponse.imageList) : {};
      const shortList = take(serviceResponse.imageList, 1) || [];

      return (
        <div className="root">
          <DisplayAtBreakpoint
            screenMedium
            screenLarge
            screenXLarge
          >
            <SloohSlider {...sliderProps} />
          </DisplayAtBreakpoint>
          <DisplayAtBreakpoint
            screenSmall
          >
            {shortList.map(object => (
              <RecommendedObservationSliderItem
                key={uniqueId()}
                currentIndex={1}
                imageIndex={1}
                {...object}
               />
            ))}
          </DisplayAtBreakpoint>
        </div>)
    }}
  />);

export default Observations;
