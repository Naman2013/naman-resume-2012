import React from 'react';
import defaultSliderConfiguration from 'components/common/Slider/sliderConfig';
import RecommendedObjectsItem from './partials/RecommendedObjectsSliderItem';


const getSliderConfiguration = () => Object.assign(
  {},
  defaultSliderConfiguration(),
  {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    centerPadding: '25px',
  },
);

const getRecommendedObjectsItems = (recommendedObjectsList = []) =>
  recommendedObjectsList.map(object => ({
    render: () => <RecommendedObjectsItem key={`${object.title} ${object.subtitle}`} {...object} />,
  }));

export const getSliderProps = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedObjectsItems(slideList),
  }, {
    sliderConfig: getSliderConfiguration(),
    emptyMessage: 'There are no recommended objects.',
  })
);
