/***********************************
* V4 Recommended Objects Slider
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SloohSlider from 'components/common/Slider';
// import { secondaryFont } from 'styles/variables/fonts';
import { getSliderConfiguration } from './recommendedObjectsConfiguration';
const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const RecommendedObjects = ({
  recommendedObjectsList,
}) => {
  const sliderConfig = getSliderConfiguration(recommendedObjectsList);
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
export default RecommendedObjects;
