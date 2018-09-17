import React from 'react';
import uniqueId from 'lodash/uniqueId';
import StoryTile from 'components/common/tiles/StoryTile';

const sliderConfiguration = {
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 1,
  emptyMessage: 'There are no recommended stories.',
};

const getRecommendedStoriesItems = (storiesList = []) =>
storiesList.map(object => ({
  render: () => (<StoryTile
    key={uniqueId()}
    iconURL={object.iconURL}
    title={object.title}
    author={'BY ' + object.author}
  />),
}));

export const getSliderConfiguration = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedStoriesItems(slideList),
  }, sliderConfiguration)
);
