import React from 'react';
import uniqueId from 'lodash/uniqueId';
import defaultSliderConfiguration from 'components/common/Slider/sliderConfig';
import RecommendedQuestItem from './partials/RecommendedQuestItem';


const getSliderConfiguration = () => Object.assign(
  {},
  defaultSliderConfiguration(),
  {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    centerPadding: '25px',
  },
);

const getRecommendedQuestsItems = (recommendedQuestList = []) =>
  recommendedQuestList.map(quest => ({
    render: () => <RecommendedQuestItem key={uniqueId()} {...quest} />,
  }));

export const getSliderProps = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedQuestsItems(slideList),
  }, {
    sliderConfig: getSliderConfiguration(),
    emptyMessage: 'There are no recommended objects.',
  })
);
