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


          `}
        </style>
      </div>)
  }}
/>);

export default Groups;
