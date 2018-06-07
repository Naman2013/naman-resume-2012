/***********************************
* V4 Recommended Shows Slider
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SloohSlider from 'components/common/Slider';
import Request from 'components/common/network/Request';
import { HIGHLIGHTED_EVENTS } from 'services/events';
// import { secondaryFont } from 'styles/variables/fonts';
import { getSliderConfiguration } from './recommendedShowsSliderConfiguration';
const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const Shows = ({
}) => (<Request
  serviceURL={HIGHLIGHTED_EVENTS}
  method="GET"
  render={({
    fetchingContent,
    serviceResponse,
  }) => {
    const sliderConfig = getSliderConfiguration(serviceResponse.eventList);
    return (
      <div className="root">
        <SloohSlider
          {...sliderConfig}
        />

        <style jsx>{`

        `}
        </style>

        <style jsx global>
          {`


          `}
        </style>
      </div>)
  }}
/>);

export default Shows;
