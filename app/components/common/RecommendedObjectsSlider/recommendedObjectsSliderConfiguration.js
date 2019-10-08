import React from 'react';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import RecommendedObjectsItem from './partials/RecommendedObjectsSliderItem';

import messages from './RecommendedObjectsSlider.message';

const getSliderConfiguration = () =>
  Object.assign({}, defaultSliderConfiguration(), {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    centerPadding: '25px',
  });

const getRecommendedObjectsItems = (
  recommendedObjectsList = [],
  reservationModalShow,
  reservedButtonCaption,
  optionsButtonCaption
) =>
  recommendedObjectsList.map(object => ({
    render: () => (
      <RecommendedObjectsItem
        key={`${object.title} ${object.subtitle}`}
        object={object}
        reservationModalShow={reservationModalShow}
        reservedButtonCaption={reservedButtonCaption}
        optionsButtonCaption={optionsButtonCaption}
      />
    ),
  }));

export const getSliderProps = (
  slideList = [],
  reservationModalShow,
  reservedButtonCaption,
  optionsButtonCaption,
  t
) =>
  Object.assign(
    {
      slideList: getRecommendedObjectsItems(
        slideList,
        reservationModalShow,
        reservedButtonCaption,
        optionsButtonCaption
      ),
    },
    {
      sliderConfig: getSliderConfiguration(),
      emptyMessage: t('.NothingToShow'),
    }
  );
