import React from 'react';
import { FormattedMessage } from 'react-intl';

import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import RecommendedObjectsItem from './partials/RecommendedObjectsSliderItem';

import messages from './RecommendedObjectsSlider.message';

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

const getRecommendedObjectsItems = (recommendedObjectsList = []) =>
  recommendedObjectsList.map(object => ({
    render: () => <RecommendedObjectsItem key={`${object.title} ${object.subtitle}`} {...object} />,
  }));

export const getSliderProps = (slideList = []) => (
  Object.assign({
    slideList: getRecommendedObjectsItems(slideList),
  }, {
    sliderConfig: getSliderConfiguration(),
    emptyMessage: <FormattedMessage {...messages.NothingToShow} />,
  })
);
