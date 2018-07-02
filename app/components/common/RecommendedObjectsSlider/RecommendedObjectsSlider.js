/***********************************
* V4 Recommended Objects Slider
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import SloohSlider from 'components/common/Slider';
import { getSliderConfiguration } from './recommendedObjectsSliderConfiguration';

// import { secondaryFont } from 'styles/variables/fonts';
const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const RecommendedObjects = ({
  recommendedObjectsList = [],
}) => {
  const sliderConfig = getSliderConfiguration(recommendedObjectsList);
  return (
    <div className="root" key={uniqueId()}>
      <SloohSlider
        {...sliderConfig}
      />

      <style jsx>{`

      `}
      </style>

      <style jsx global>
        {`
          .dash-item-first .slick-track {
            transfrom: none !important;
          }

        `}
      </style>
    </div>);
};

RecommendedObjects.propTypes = {

};

RecommendedObjects.defaultProps = {

};

export default RecommendedObjects;
