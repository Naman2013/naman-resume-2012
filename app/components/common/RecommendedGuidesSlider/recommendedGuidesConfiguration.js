import React from 'react';
import uniqueId from 'lodash/uniqueId';

const sliderConfiguration = {
  slidesToShow: 2,
  slidesToScroll: 1,
  initialSlide: 1,
  emptyMessage: 'There are no guides.',
};

const getGuidesItems = (recommendedGuidesList = []) =>
  recommendedGuidesList.map(object => <div key={uniqueId()}>{object.title}</div>);

export const getSliderConfiguration = (slideList = []) => (
  Object.assign({
    slideList: getGuidesItems(slideList),
  }, sliderConfiguration)
);
