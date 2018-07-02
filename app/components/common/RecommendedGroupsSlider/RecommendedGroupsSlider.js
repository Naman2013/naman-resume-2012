/***********************************
* V4 Recommended Groups Slider
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SloohSlider from 'components/common/Slider';
import Request from 'components/common/network/Request';
import { GET_GROUPS, SORT_BY_POPULAR } from 'services/community-groups';
// import { secondaryFont } from 'styles/variables/fonts';
import { getSliderConfiguration } from './recommendedGroupsSliderConfiguration';
const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const Groups = ({
}) => (<Request
  serviceURL={GET_GROUPS}
  method="POST"
  requestBody={SORT_BY_POPULAR}
  render={({
    fetchingContent,
    serviceResponse,
  }) => {
    const sliderConfig = getSliderConfiguration(serviceResponse.groups);
    return (
      <div className="root">
        <SloohSlider
          {...sliderConfig}
        />

        <style jsx>{`
    
        `}
        </style>

        <style jsx global>
          {`
          .card-groups {
            background-image: url("https://vega.slooh.com/assets/v4/dashboard/group-card-bg.svg");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 50%;
            color: white;
            font-weight: 600;
            letter-spacing: 1px;
            padding: 0 40px;
            font-size: 10px;
            width: 300px !important;
            min-height: 370px;
          }
          .card-groups-img {
            background-image: url(https://vega.slooh.com/assets/v4/dashboard/group-graphic-1.png);
            background-size: 112px;
            background-repeat: no-repeat;
            background-position: 50%;
            width: 100%;
            height: 250px;
          }
          .card-title {
            font-family: "Adobe Garamond Pro", "adobe-garamond-pro", "Adobe Garamond", "Garamond", serif;
            font-size: 22px;
            line-height: 22px;     
            font-weight: 400;
            margin-bottom: 15px;    
          }
          `}
        </style>
      </div>)
  }}
/>);

export default Groups;
