import React from 'react';
import defaultSliderConfiguration from '../Slider/sliderConfig';
import BigShowTile from '../tiles/BigShowTile';

const getSliderConfiguration = () =>
  Object.assign({}, defaultSliderConfiguration(), {
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    centerPadding: '50px',
    centerMode: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10px',
        },
      },
    ],
  });

const getRecommendedEventsItems = (imageList = [], readOnly = false) =>
  imageList.map(object => ({
    render: () => (
      <BigShowTile key={object.eventId} {...object} readOnly={readOnly} />
    ),
  }));

export const getSliderProps = (slideList = [], t, readOnly) =>
  Object.assign(
    {
      slideList: getRecommendedEventsItems(slideList, readOnly),
    },
    {
      sliderConfig: getSliderConfiguration(),
      emptyMessage: t('Dashboard.NothingToShow'),
    }
  );
