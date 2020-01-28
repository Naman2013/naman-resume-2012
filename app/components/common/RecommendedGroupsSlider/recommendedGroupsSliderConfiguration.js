import React from 'react';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import GroupTile from 'app/components/common/tiles/GroupTile';

const getSliderConfiguration = () =>
  Object.assign({}, defaultSliderConfiguration(), {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    centerPadding: '25px',
  });

const getRecommendedGroupsItems = (groupList = [], readOnly = false) =>
  groupList.map(object => ({
    render: () => (
      <GroupTile
        key={`group-tile-${object.discussionGroupId}`}
        title={object.title}
        accessDescription={object.accessDescription}
        iconURL={object.iconUrl}
        linkUrl={object.linkUrl}
        readOnly={readOnly}
      />
    ),
  }));

export const getSliderProps = (slideList = [], t, readOnly) =>
  Object.assign(
    {
      slideList: getRecommendedGroupsItems(slideList, readOnly),
    },
    {
      sliderConfig: getSliderConfiguration(),
      emptyMessage: t('Dashboard.NothingToShow'),
    }
  );
