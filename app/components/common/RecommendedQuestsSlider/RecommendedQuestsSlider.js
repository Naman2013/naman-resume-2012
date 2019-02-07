/***********************************
* V4 Recommended Quests Slider
*
*
*
***********************************/
import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import take from 'lodash/take';
import SloohSlider from '../../../components/common/Slider';
import DisplayAtBreakpoint from '../../../components/common/DisplayAtBreakpoint';
import { getSliderProps } from './recommendedQuestsSliderConfiguration';
import RecommendedQuestSliderItem from './partials/RecommendedQuestItem';

import style from './RecommendedQuestsSlider.style';

const {
  arrayOf,
  shape,
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
            key={quest.linkUrl}
            {...quest}
          />
        ))}
      </DisplayAtBreakpoint>
      <style jsx>{`

      `}
      </style>

      <style jsx global>{style}</style>
    </div>);
};

RecommendedObjects.propTypes = {
  recommendedQuestsList: arrayOf(shape({

  })).isRequired,
};

RecommendedObjects.defaultProps = {

};

export default RecommendedObjects;
