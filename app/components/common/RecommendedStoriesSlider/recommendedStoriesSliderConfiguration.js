import React from 'react';
import uniqueId from 'lodash/uniqueId';
import has from 'lodash/has';
import defaultSliderConfiguration from 'components/common/Slider/sliderConfig';
import StoryTile from 'components/common/tiles/StoryTile';

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
const getRecommendedStoriesItems = (storiesList = []) =>
storiesList.map(object => ({
  render: () => (<StoryTile
    key={uniqueId()}
    iconURL={object.iconURL}
    title={object.title}
    linkUrl={object.linkUrl}
    author={has(object, 'authorInfo.byline') ? object.authorInfo.byline : ''}
  />),
}));

export const getSliderProps = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedStoriesItems(slideList),
  }, {
    sliderConfig: getSliderConfiguration(),
    emptyMessage: 'There are no recommended stories.',
  })
);
