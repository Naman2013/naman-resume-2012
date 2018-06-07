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
import { getSliderConfiguration, modelStoriesFromApiRes } from './recommendedStoriesSliderConfiguration';
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


          `}
        </style>
      </div>)
  }}
/>);

export default Stories;
