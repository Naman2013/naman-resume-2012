import React from 'react';
import defaultSliderConfiguration from 'components/common/Slider/sliderConfig';
import RecommendedObservationSliderItem from './partials/RecommendedObservationsSliderItem';

const getSliderConfiguration = () => Object.assign(
  {},
  defaultSliderConfiguration(),
  {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    centerMode: false,
    centerPadding: '50px',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '50px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '50px',
          swipe: true,
          dots: true,
          infinite: false,
        },
      },
    ],
  },
);

const getRecommendedObservationsItems = (imageList = []) => {
  return imageList.map(object => ({
    customerImageId: object.customerImageId,
    render: sliderProps => <RecommendedObservationSliderItem {...sliderProps} {...object} />,
  }));
};

export const getSliderProps = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedObservationsItems(slideList),
  }, {
      sliderConfig: getSliderConfiguration(),
      emptyMessage: 'There are no recommended observations.',
    })
);
