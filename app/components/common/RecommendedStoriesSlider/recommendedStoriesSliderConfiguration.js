import React from 'react';
import uniqueId from 'lodash/uniqueId';

const sliderConfiguration = {
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 1,
  emptyMessage: 'There are no recommended stories.',
};

const getRecommendedStoriesItems = (storiesList = []) =>
storiesList.map(object => 
  <div key={uniqueId()} className="card-stories">
    <div className="card-stories-img"></div>
    <div className="card-title">{object.title}</div>
    <div className="card-stories-author">BY {object.subtitle}</div>
  </div>)

export const getSliderConfiguration = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedStoriesItems(slideList),
  }, sliderConfiguration)
);
