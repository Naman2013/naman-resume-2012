/***********************************
* V4 Recommended Objects Slider
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import take from 'lodash/take';
import has from 'lodash/has';
import SloohSlider from 'components/common/Slider';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import { getSliderProps } from './recommendedObjectsSliderConfiguration';
import RecommendedObjectsSliderItem from './partials/RecommendedObjectsSliderItem';

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
  const sliderProps = getSliderProps(recommendedObjectsList);
  const shortList = take(recommendedObjectsList, 2) || [];
  return (
    <div className="root" key={uniqueId()}>
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
          <RecommendedObjectsSliderItem
            key={uniqueId()}
            {...object}
          />
        ))}
      </DisplayAtBreakpoint>
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
