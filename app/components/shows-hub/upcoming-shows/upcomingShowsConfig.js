import React from 'react';
import uniqueId from 'lodash/uniqueId';
import defaultSliderConfiguration from 'components/common/Slider/sliderConfig';
import BigShowTile from 'components/common/tiles/BigShowTile';
import UpcomingShowSliderItem from './upcoming-shows-slider-item';

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


const getUpcomingShowsItem = (imageList = []) =>
  imageList.map(object => ({
    render: () => (<UpcomingShowSliderItem {...object} />)
}));

export const getSliderProps = (imageList = []) => (
  Object.assign({
    slideList: getUpcomingShowsItem(imageList),
  }, {
    sliderConfig: getSliderConfiguration(),
    emptyMessage: 'There are no upcoming shows.',
  })
);
