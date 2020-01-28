/***********************************
 * V4 Guides Slider
 *
 *
 *
 ***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import take from 'lodash/take';
import has from 'lodash/has';
import SloohSlider from 'app/components/common/Slider';
import { romance } from 'app/styles/variables/colors_tiles_v4';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import BigGuideTile from 'app/components/common/tiles/BigGuideTile/BigGuideTile';
import { useTranslation } from 'react-i18next';
import { getSliderProps } from './recommendedGuidesConfiguration';

const { arrayOf, bool, func, number, shape, string } = PropTypes;

const Guides = ({ recommendedGuidesList }) => {
  const { t } = useTranslation();
  const sliderProps = getSliderProps(recommendedGuidesList, t);
  const shortList = take(recommendedGuidesList, 2) || [];
  return (
    <div className="root-dash">
      <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
        <SloohSlider {...sliderProps} />
      </DisplayAtBreakpoint>
      <DisplayAtBreakpoint screenSmall>
        {shortList.map(guide => (
          <BigGuideTile
            key={uniqueId()}
            heading={guide.heading}
            title={guide.title}
            linkUrl={guide.linkUrl}
          />
        ))}
      </DisplayAtBreakpoint>
      <style jsx>{`
        .root-dash {
          margin: 0 auto;
          max-width: 644px;
        }
        @media only screen and (min-width: 1200px) {
          .root-dash {
            max-width: 965px;
          }
        }
      `}</style>
    </div>
  );
};
export default Guides;
