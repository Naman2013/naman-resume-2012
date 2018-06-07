import React from 'react';

const sliderConfiguration = {
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 1,
  emptyMessage: 'There are no recommended shows.',
};

const getRecommendedEventsItems = (imageList = []) =>
imageList.map(object => <div key={object.eventId}>{object.title}</div>)

export const getSliderConfiguration = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedEventsItems(slideList),
  }, sliderConfiguration)
);
