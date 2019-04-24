import React from 'react';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import RecommendedQuestItem from './partials/RecommendedQuestItem';
import { FormattedMessage } from 'react-intl';

import messages from './RecommendedQuestsSlider.messages';


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

const getRecommendedQuestsItems = (recommendedQuestList = []) =>
  recommendedQuestList.map(quest => ({
    render: () => <RecommendedQuestItem key={quest.linkUrl} {...quest} />,
  }));

export const getSliderProps = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedQuestsItems(slideList),
  }, {
    sliderConfig: getSliderConfiguration(),
    emptyMessage: <FormattedMessage {...messages.NothingToShow} />,
  })
);
