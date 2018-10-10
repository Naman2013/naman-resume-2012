/***********************************
* V4 Recommended Shows Slider
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import take from 'lodash/take';
import has from 'lodash/has';
import SloohSlider from 'components/common/Slider';
import Request from 'components/common/network/Request';
import ShowTile from 'components/common/tiles/ShowTile';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import { HIGHLIGHTED_EVENTS } from 'services/events';
// import { secondaryFont } from 'styles/variables/fonts';
import { getSliderProps } from './recommendedShowsSliderConfiguration';
const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const Shows = ({
}) => (<Request
  serviceURL={HIGHLIGHTED_EVENTS}
  method="GET"
  render={({
    fetchingContent,
    serviceResponse,
  }) => {
    const sliderProps = serviceResponse.eventList ? getSliderProps(serviceResponse.eventList) : {};
    const shortList = take(serviceResponse.eventList, 2) || [];
    console.log(shortList)
    return (
      <div className="root">
        <DisplayAtBreakpoint
          screenMedium
          screenLarge
          screenXLarge
        >
          <SloohSlider {...sliderProps} />
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint
          screenSmall
        >
          {shortList.map(show => (
            <ShowTile
              header={show.header}
              time={show.time}
              author={show.author}
              key={uniqueId()}
              linkUrl={show.linkUrl}
              title={show.eventTitle}
            />
          ))}
        </DisplayAtBreakpoint>
      </div>)
  }}
/>);

export default Shows;
