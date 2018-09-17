/***********************************
* V4 Recommended Observations Slider
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SloohSlider from 'components/common/Slider';
import Request from 'components/common/network/Request';
import { SHARED_MEMBER_PHOTOS } from 'services/shared-photos';
// import { secondaryFont } from 'styles/variables/fonts';
import { getSliderConfiguration } from './recommendedObservationsSliderConfiguration';
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
      const sliderConfig = getSliderConfiguration(serviceResponse.imageList);

      return (
        <div className="root">
          <SloohSlider {...sliderConfig} />
        </div>)
    }}
  />);

export default Observations;
