import React from 'react';

const sliderConfiguration = {
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 1,
  emptyMessage: 'There are no fuides.',
};

const getGuidesItems = (recommendedGuidesList = []) =>
recommendedGuidesList.map(object => <div>{object.title}</div>)

export const getSliderConfiguration = (slideList = []) => (
  Object.assign({
    slideList: getGuidesItems(slideList),
  }, sliderConfiguration)
);
