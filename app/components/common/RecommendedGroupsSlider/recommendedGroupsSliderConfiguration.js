import React from 'react';
import uniqueId from 'lodash/uniqueId';
import defaultSliderConfiguration from 'components/common/Slider/sliderConfig';
import GroupTile from 'components/common/tiles/GroupTile';

const getSliderConfiguration = () => Object.assign(
  {},
  defaultSliderConfiguration(),
  {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 1,
    centerPadding: '25px',
  },
);

const getRecommendedGroupsItems = (groupList = []) =>
groupList.map(object => ({
  render: () => (
    <GroupTile
      key={uniqueId()}
      title={object.title}
      accessDescription={object.accessDescription}
      iconURL={object.iconURL}
      linkUrl={object.linkUrl}
    />
  ),
}))

export const getSliderProps = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedGroupsItems(slideList),
  }, {
    sliderConfig: getSliderConfiguration(),
    emptyMessage: 'There are no recommended groups.',
  })
);
