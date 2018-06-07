import React from 'react';
import uniqueId from 'lodash/uniqueId';
import RecommendedObservationSliderItem from './partials/RecommendedObservationsSliderItem';

const sliderConfiguration = {
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 1,
  emptyMessage: 'There are no recommended observations.',
};

const getRecommendedObservationsItems = (imageList = []) =>
imageList.map(object => <RecommendedObservationSliderItem key={uniqueId()} {...object} />)

export const getSliderConfiguration = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedObservationsItems(slideList),
  }, sliderConfiguration)
);
