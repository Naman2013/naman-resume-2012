import React from 'react';
import uniqueId from 'lodash/uniqueId';
import defaultSliderConfiguration from 'components/common/Slider/sliderConfig';
import BigGuideTile from 'components/common/tiles/BigGuideTile/BigGuideTile';


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

const getGuidesItems = (recommendedGuidesList = []) =>
  recommendedGuidesList.map(object => ({
    render: () => (<BigGuideTile
      key={uniqueId()}
      heading={object.heading}
      title={object.title}
      linkUrl={object.linkUrl}
    />),
  }),
);

export const getSliderProps = (slideList = []) => (
  Object.assign({
    slideList: getGuidesItems(slideList),
  }, {
    sliderConfig: getSliderConfiguration(),
    emptyMessage: 'There are no recommended guides.',
  })
);
