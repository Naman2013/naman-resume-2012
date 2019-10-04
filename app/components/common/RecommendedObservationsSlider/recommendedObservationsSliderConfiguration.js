import React from 'react';
import { FormattedMessage } from 'react-intl';

import defaultSliderConfiguration from '../Slider/sliderConfig';
import RecommendedObservationSliderItem from './partials/RecommendedObservationsSliderItem';

import messages from './RecommendedObservationsSlider.messages';

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

const getRecommendedObservationsItems = (imageList = []) => {
  return imageList.map(object => {
    return {
      customerImageId: parseInt(object.customerImageId, 10),
      render: sliderProps => (
        <RecommendedObservationSliderItem
          key={imageList.customerImageId}
          {...sliderProps}
          {...object}
        />
      ),
    };
  });
};

export const getSliderProps = (slideList = [], t) => {
  return Object.assign(
    {
      slideList: getRecommendedObservationsItems(slideList),
    },
    {
      sliderConfig: getSliderConfiguration(),
      emptyMessage: t('.NothingToShow'),
    }
  );
};
