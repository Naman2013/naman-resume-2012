import React from 'react';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import { QuestListItem } from './quest-list-item';

const getSliderConfiguration = () =>
  Object.assign({}, defaultSliderConfiguration(), {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    centerPadding: '25px',
  });

const getRecommendedQuestsItems = (recommendedQuestList = [], readOnly) =>
  recommendedQuestList.map(quest => ({
    render: () => (
      <QuestListItem key={quest.linkUrl} {...quest} readOnly={readOnly} />
    ),
  }));

export const getSliderProps = (slideList = [], t, readOnly) =>
  Object.assign(
    {
      slideList: getRecommendedQuestsItems(slideList, readOnly),
    },
    {
      sliderConfig: getSliderConfiguration(),
      emptyMessage: t('Dashboard.NothingToShow'),
    }
  );
