import React from 'react';
import uniqueId from 'lodash/uniqueId';

const sliderConfiguration = {
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 1,
  emptyMessage: 'There are no guides.',
};

const getGuidesItems = (recommendedGuidesList = []) =>
  recommendedGuidesList.map(object => (
    <div key={uniqueId()} className="card-guides">
      <div className="card-guides-head">A GUIDE TO</div>
      <div className="card-guides-title">{object.title}</div>
    </div>
    )  
  );

export const getSliderConfiguration = (slideList = []) => (
  Object.assign({
    slideList: getGuidesItems(slideList),
  }, sliderConfiguration)
);
