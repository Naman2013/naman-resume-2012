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
          .card-shows {
            background-image: url("https://vega.slooh.com/assets/v4/dashboard/show-card-bg.jpg");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 50%;
            font-weight: 600;
            letter-spacing: 1px;
            padding: 0 40px;
            font-size: 10px;
            height: 259px;
            width: 460px !important;
            color: white;
          }

          `}
        </style>
      </div>)
  }}
/>);

export default Shows;
