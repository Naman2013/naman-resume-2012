import React from 'react';

const sliderConfiguration = {
  slidesToShow: 2,
  slidesToScroll: 2,
  initialSlide: 1,
  emptyMessage: 'There are no recommended shows.',
};

const getRecommendedEventsItems = (imageList = []) =>
imageList.map(object => 
  <div key={object.eventId} className="card-shows">
    SLOOH SHOW
    {object.title}
    <div className="show-card-author">TIME | AUTHOR</div>
  </div>);

export const getSliderConfiguration = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedEventsItems(slideList),
  }, sliderConfiguration)
);
