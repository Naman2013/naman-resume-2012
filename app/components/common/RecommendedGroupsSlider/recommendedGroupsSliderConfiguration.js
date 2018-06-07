import React from 'react';
import uniqueId from 'lodash/uniqueId';

const sliderConfiguration = {
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 1,
  emptyMessage: 'There are no recommended groups.',
};

const getRecommendedGroupsItems = (groupList = []) =>
groupList.map(object => <div key={uniqueId()}>{object.title}</div>)

export const getSliderConfiguration = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedGroupsItems(slideList),
  }, sliderConfiguration)
);
