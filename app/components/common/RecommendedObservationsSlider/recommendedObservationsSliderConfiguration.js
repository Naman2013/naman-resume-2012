import React from 'react';
import uniqueId from 'lodash/uniqueId';
import defaultSliderConfiguration from 'components/common/Slider/sliderConfig';
import RecommendedObservationSliderItem from './partials/RecommendedObservationsSliderItem';

const getSliderConfiguration = () => Object.assign(
  {},
  defaultSliderConfiguration(),
  {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    centerPadding: '50px',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '50px',
        }
      },
    ],
  },
)

const getRecommendedObservationsItems = (imageList = []) => {
  return imageList.map(object => ({
    render: (sliderProps) =>  <RecommendedObservationSliderItem key={uniqueId()} {...sliderProps} {...object}  />,
  }))
}

export const getSliderProps = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedObservationsItems(slideList),
  }, {
    sliderConfig: getSliderConfiguration(),
    emptyMessage: 'There are no recommended observations.',
  })
);
