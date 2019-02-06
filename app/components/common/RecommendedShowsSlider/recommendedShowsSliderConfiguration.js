import React from 'react';
import defaultSliderConfiguration from 'components/common/Slider/sliderConfig';
import BigShowTile from 'components/common/tiles/BigShowTile';

const getSliderConfiguration = () => Object.assign(
  {},
  defaultSliderConfiguration(),
  {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
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


const getRecommendedEventsItems = (imageList = []) =>
  imageList.map(object => ({
    render: () => (<BigShowTile key={object.eventId} {...object} />),
  }));

export const getSliderProps = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedEventsItems(slideList),
  }, {
    sliderConfig: getSliderConfiguration(),
    emptyMessage: 'There are no recommended shows.',
  })
);
