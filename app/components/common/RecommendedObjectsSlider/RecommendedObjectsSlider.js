/***********************************
* V4 Recommended Objects Slider
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
import { getSliderProps } from './recommendedObjectsSliderConfiguration';
import MissionTileSmall from '../../../components/common/tiles/MissionTile/MissionTileSmall';

import style from './RecommendedObjectsSlider.style';

const {
  arrayOf,
  shape,
} = PropTypes;

const RecommendedObjects = ({
  recommendedObjectsList = [],
}) => {
  const sliderProps = getSliderProps(recommendedObjectsList);
  const shortList = take(recommendedObjectsList, 3) || [];
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
        <div className="mobile-tiles-wrapper">
          {shortList.map(object => (
            <MissionTileSmall
              key={`${object.title} ${object.subtitle}`}
              title={object.title}
              date={object.detailList[0].text}
              time={object.detailList[1].text.split(' ')[0]}
              telescope={object.detailList[2].text}
            />
          ))}
        </div>
      </DisplayAtBreakpoint>
      <style jsx>{`

      `}
      </style>

      <style jsx global>{style}</style>
    </div>);
};

RecommendedObjects.propTypes = {
  recommendedObjectsList: arrayOf(shape({})),
};

RecommendedObjects.defaultProps = {
  recommendedObjectsList: [],
};

export default RecommendedObjects;
