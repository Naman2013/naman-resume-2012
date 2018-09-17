import React from 'react';
import uniqueId from 'lodash/uniqueId';
import RecommendedObservationSliderItem from './partials/RecommendedObservationsSliderItem';

const sliderConfiguration = {
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 1,
  emptyMessage: 'There are no recommended observations.',
};

const getRecommendedObservationsItems = (imageList = []) => {
  return imageList.map(object => ({
    render: (sliderProps) =>  <RecommendedObservationSliderItem key={uniqueId()} {...sliderProps} {...object}  />,
  }))
}

export const getSliderConfiguration = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedObservationsItems(slideList),
  }, sliderConfiguration)
);
