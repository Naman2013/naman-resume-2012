import React from 'react';
import defaultSliderConfiguration from '../Slider/sliderConfig';
import RecommendedObservationSliderItem from './partials/RecommendedObservationsSliderItem';

const getSliderConfiguration = () =>
  Object.assign({}, defaultSliderConfiguration(), {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
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
  });

const getRecommendedObservationsItems = (imageList = [], readOnly = false) => {
  return imageList.map(object => {
    return {
      customerImageId: parseInt(object.customerImageId, 10),
      render: sliderProps => (
        <RecommendedObservationSliderItem
          {...sliderProps}
          {...object}
          readOnly={readOnly}
        />
      ),
    };
  });
};

export const getSliderProps = (slideList = [], t, readOnly) => {
  return Object.assign(
    {
      slideList: getRecommendedObservationsItems(slideList, readOnly),
    },
    {
      sliderConfig: getSliderConfiguration(),
      emptyMessage: t('Dashboard.NothingToShow'),
    }
  );
};
