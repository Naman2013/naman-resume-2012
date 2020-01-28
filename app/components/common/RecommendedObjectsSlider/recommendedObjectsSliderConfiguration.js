import React from 'react';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import RecommendedObjectsItem from './partials/RecommendedObjectsSliderItem';

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
  optionsButtonCaption,
  readOnly = false
) =>
  recommendedObjectsList.map(object => ({
    render: () => (
      <RecommendedObjectsItem
        key={`${object.title} ${object.subtitle}`}
        object={object}
        reservationModalShow={reservationModalShow}
        reservedButtonCaption={reservedButtonCaption}
        optionsButtonCaption={optionsButtonCaption}
        readOnly={readOnly}
      />
    ),
  }));

export const getSliderProps = (
  slideList = [],
  reservationModalShow,
  reservedButtonCaption,
  optionsButtonCaption,
  t,
  readOnly
) =>
  Object.assign(
    {
      slideList: getRecommendedObjectsItems(
        slideList,
        reservationModalShow,
        reservedButtonCaption,
        optionsButtonCaption,
        readOnly
      ),
    },
    {
      sliderConfig: getSliderConfiguration(),
      emptyMessage: t('Dashboard.NothingToShow'),
    }
  );
