/***********************************
* V4 Guides Slider
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SloohSlider from 'components/common/Slider';
// import { secondaryFont } from 'styles/variables/fonts';
import { getSliderConfiguration } from './recommendedGuidesConfiguration';
const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const Guides = ({
  recommendedGuidesList,
}) => {
  const sliderConfig = getSliderConfiguration(recommendedGuidesList);
  return (
    <div className="root-dash">
      <SloohSlider
        {...sliderConfig}
      />

      <style jsx>{`
        .root-dash {
          background-color: white;
        }
      `}
      </style>

      <style jsx global>
        {`
          .card-guides {
            background-image: url("https://s3.amazonaws.com/webassets-slooh-com/assets/v4/dashboard/guide-card-bg.png");
            background-color: #213043;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 50%;
            color: white;
            font-weight: 600;
            letter-spacing: 1px;
            padding: 0 40px;
            font-size: 10px;
            width: 300px !important;
            min-height: 462px;
          }
          .card-guides-head {
            color: #FAD59A;
            font-weight: 400;
            margin: 200px 0 20px 0;
            letter-spacing: 2px;
          }
          .card-guides-title {
            color: white;
            font-family: "Adobe Garamond Pro","adobe-garamond-pro","Adobe Garamond","Garamond",serif;
            font-size: 22px;
            line-height: 22px;
            font-weight: 400;
            max-width: 80%;
            margin: 0 auto;
          }
        `}
      </style>
    </div>)
};
export default Guides;
