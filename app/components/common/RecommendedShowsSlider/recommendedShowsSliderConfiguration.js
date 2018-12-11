import React from 'react';
import uniqueId from 'lodash/uniqueId';
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
    render: () => (<BigShowTile
      header={object.header}
      dateDisplay={object.dateDisplay}
      eventHostName={object.eventHost}
      key={uniqueId()}
      linkUrl={object.linkUrl}
      title={object.eventTitle}
    />)
}));

export const getSliderProps = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedEventsItems(slideList),
  }, {
    sliderConfig: getSliderConfiguration(),
    emptyMessage: 'There are no recommended shows.',
  })
);
