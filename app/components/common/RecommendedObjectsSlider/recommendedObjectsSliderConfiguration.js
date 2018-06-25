import React from 'react';
import uniqueId from 'lodash/uniqueId';
import RecommendedObjectsItem from './partials/RecommendedObjectsSliderItem';


const sliderConfiguration = {
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 1,
  emptyMessage: 'There are no recommended objects.',
};

const getRecommendedObjectsItems = (recommendedObjectsList = []) =>
recommendedObjectsList.map(object => <RecommendedObjectsItem key={uniqueId()} {...object} />)

export const getSliderConfiguration = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedObjectsItems(slideList),
  }, sliderConfiguration)
);
