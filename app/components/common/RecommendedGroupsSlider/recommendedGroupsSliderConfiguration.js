import React from 'react';
import uniqueId from 'lodash/uniqueId';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import GroupTile from 'app/components/common/tiles/GroupTile';

import messages from './RecommendedGroupsSlider.messages';

const getSliderConfiguration = () =>
  Object.assign({}, defaultSliderConfiguration(), {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    centerPadding: '25px',
  });

const getRecommendedGroupsItems = (groupList = []) =>
  groupList.map(object => ({
    render: () => (
      <GroupTile
        key={uniqueId()}
        title={object.title}
        accessDescription={object.accessDescription}
        iconURL={object.iconUrl}
        linkUrl={object.linkUrl}
      />
    ),
  }));

export const getSliderProps = (slideList = [], t) =>
  Object.assign(
    {
      slideList: getRecommendedGroupsItems(slideList),
    },
    {
      sliderConfig: getSliderConfiguration(),
      emptyMessage: t('.NothingToShow'),
    }
  );
