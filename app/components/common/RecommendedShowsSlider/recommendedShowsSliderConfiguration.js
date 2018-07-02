import React from 'react';

const sliderConfiguration = {
  slidesToShow: 2,
  slidesToScroll: 1,
  initialSlide: 1,
  emptyMessage: 'There are no recommended shows.',
};

const getRecommendedEventsItems = (imageList = []) =>
imageList.map(object => 
  <div key={object.eventId} className="card-shows">
    <div className="show-card-head">SLOOH SHOW</div>
    <div className="show-card-title">{object.title}Constellation Stories with Helen Avery (Libra)</div>
    <div className="show-card-author">30 MINS &nbsp;&nbsp; | &nbsp;&nbsp; HELEN AVERY</div>
  </div>);

export const getSliderConfiguration = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedEventsItems(slideList),
  }, sliderConfiguration)
);
