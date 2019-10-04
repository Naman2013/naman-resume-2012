import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { FormattedMessage } from 'react-intl';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import BigShowTile from 'app/components/common/tiles/BigShowTile';
import UpcomingShowSliderItem from './upcoming-shows-slider-item';
import messages from './upcomingShowsConfig.messages';

const getSliderConfiguration = () =>
  Object.assign({}, defaultSliderConfiguration(), {
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
          centerPadding: '0px',
        },
      },
    ],
  });

const getUpcomingShowsItem = (imageList = []) =>
  imageList.map(object => ({
    render: () => <UpcomingShowSliderItem {...object} />,
  }));

export const getSliderProps = (imageList = [], t) =>
  Object.assign(
    {
      slideList: getUpcomingShowsItem(imageList),
    },
    {
      sliderConfig: getSliderConfiguration(),
      emptyMessage: t('.noShows'),
    }
  );
