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
import SloohSlider from 'components/common/Slider';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import { getSliderProps } from './recommendedQuestsSliderConfiguration';
import RecommendedQuestSliderItem from './partials/RecommendedQuestItem';

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
  recommendedQuestsList = [],
}) => {
  const sliderProps = getSliderProps(recommendedQuestsList);
  const shortList = take(recommendedQuestsList, 2) || [];
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
        {shortList.map(quest => (
          <RecommendedQuestSliderItem
            key={uniqueId()}
            {...quest}
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
  recommendedQuestsList: arrayOf(shape({

  })).isRequired,
};

RecommendedObjects.defaultProps = {

};

export default RecommendedObjects;
