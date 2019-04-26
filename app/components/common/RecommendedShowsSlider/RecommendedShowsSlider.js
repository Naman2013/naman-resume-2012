/***********************************
 * V4 Recommended Shows Slider
 *
 *
 *
 ***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import take from 'lodash/take';
import SloohSlider from 'app/components/common/Slider';
import Request from 'app/components/common/network/Request';
import ShowTile from 'app/components/common/tiles/ShowTile';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import { HIGHLIGHTED_EVENTS } from 'app/services/events';
// import { secondaryFont } from 'app/styles/variables/fonts';
import { getSliderProps } from './recommendedShowsSliderConfiguration';
const { arrayOf, bool, func, number, shape, string } = PropTypes;

const Shows = ({}) => (
  <Request
    serviceURL={HIGHLIGHTED_EVENTS}
    method="GET"
    render={({ fetchingContent, serviceResponse }) => {
      const sliderProps = serviceResponse.eventList
        ? getSliderProps(serviceResponse.eventList)
        : {};
      const shortList = take(serviceResponse.eventList, 2) || [];
      return (
        <div className="root">
          <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
            <SloohSlider {...sliderProps} />
          </DisplayAtBreakpoint>
          <DisplayAtBreakpoint screenSmall>
            {shortList.map(show => (
              <ShowTile
                key={show.eventId}
                header={show.heading}
                linkUrl={show.linkUrl}
                title={show.eventTitle}
              />
            ))}
          </DisplayAtBreakpoint>
        </div>
      );
    }}
  />
);

export default Shows;
