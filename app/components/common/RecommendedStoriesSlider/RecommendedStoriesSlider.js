/***********************************
* V4 Recommended Stories Slider
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SloohSlider from 'components/common/Slider';
import Request from 'components/common/network/Request';
import { HOMEPAGE_CONTENT } from 'services/dashboard';
// import { secondaryFont } from 'styles/variables/fonts';
import { getSliderConfiguration } from './recommendedStoriesSliderConfiguration';
const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const Stories = ({
}) => (<Request
  serviceURL={HOMEPAGE_CONTENT}
  method="POST"
  render={({
    fetchingContent,
    serviceResponse,
  }) => {
    const sliderConfig = getSliderConfiguration(serviceResponse.posts);
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
          .card-stories {
            background-image: url("https://vega.slooh.com/assets/v4/dashboard/story-card-bg.svg");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 50%;
            font-weight: 600;
            letter-spacing: 1px;
            padding: 0 40px;
            font-size: 10px;
            width: 300px !important;
            min-height: 370px;
          }
          .card-stories-img {
            height: 222px;
          }
          .card-stories-author {
            font-weight: 600;
            letter-spacing: 1px;
            font-size: 10px;
          }

          `}
        </style>
      </div>)
  }}
/>);

export default Stories;
