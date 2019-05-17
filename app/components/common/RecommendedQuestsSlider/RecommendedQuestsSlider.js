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

const { arrayOf, shape } = PropTypes;

const RecommendedObjects = ({ recommendedQuestsList = [] }) => {
  const sliderProps = getSliderProps(recommendedQuestsList);
  const shortList = take(recommendedQuestsList, 2) || [];
  return (
    <div className="root" key={uniqueId()}>
      <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
        <SloohSlider {...sliderProps} />
      </DisplayAtBreakpoint>
      <DisplayAtBreakpoint screenSmall>
        {shortList.map(quest => (
          <RecommendedQuestSliderItem key={quest.linkUrl} {...quest} />
        ))}
      </DisplayAtBreakpoint>      
      <style jsx>{`
        .root {
          margin: 0 auto;
          max-width: 644px;
        }
        @media only screen and (min-width: 1200px) {
          .root {
            max-width: 965px;
          }
        }
      `}</style>
      </div>
  );
};

RecommendedObjects.propTypes = {
  recommendedQuestsList: arrayOf(shape({})).isRequired,
};

export default RecommendedObjects;
