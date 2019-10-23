import React from 'react';
import has from 'lodash/has';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import StoryTile from 'app/components/common/tiles/StoryTile';

const getSliderConfiguration = () =>
  Object.assign({}, defaultSliderConfiguration(), {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    centerPadding: '25px',
  });
const getRecommendedStoriesItems = (storiesList = []) =>
  storiesList.map(post => ({
    render: () => (
      <StoryTile
        key={post.postId}
        storyId={post.postId}
        iconURL={post.slugIconURL}
        title={post.title}
        author={
          has(post, 'authorInfo.displayName') ? post.authorInfo.displayName : ''
        }
      />
    ),
  }));

export const getSliderProps = (slideList = [], t) =>
  Object.assign(
    {
      slideList: getRecommendedStoriesItems(slideList),
    },
    {
      sliderConfig: getSliderConfiguration(),
      emptyMessage: t('Dashboard.NothingToShow'),
    }
  );
