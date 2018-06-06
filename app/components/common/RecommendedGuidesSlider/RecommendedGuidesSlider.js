/***********************************
* V4 Guides Slider
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SloohSlider from 'components/common/Slider';
// import { secondaryFont } from 'styles/variables/fonts';
import { getSliderConfiguration } from './recommendedGuidesConfiguration';
const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const Guides = ({
  recommendedGuidesList,
}) => {
  const sliderConfig = getSliderConfiguration(recommendedGuidesList);
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
};
export default Guides;
