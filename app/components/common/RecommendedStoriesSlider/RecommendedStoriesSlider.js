/***********************************
* V4 Recommended Stories Slider
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import SloohSlider from 'components/common/Slider';
import take from 'lodash/take';
import has from 'lodash/has';
import uniqueId from 'lodash/uniqueId';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import Request from 'components/common/network/Request';
import { HOMEPAGE_CONTENT } from 'services/dashboard';
import StoryTile from 'components/common/tiles/StoryTile';
import { getSliderProps } from './recommendedStoriesSliderConfiguration';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const Stories = ({
}) => (
  <Request
    serviceURL={HOMEPAGE_CONTENT}
    method="POST"
    render={({ serviceResponse }) => {
      const sliderProps = getSliderProps(serviceResponse.posts);
      const shortList = take(serviceResponse.posts, 2) || [];
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
            {shortList.map(post => (
              <StoryTile
                key={uniqueId()}
                iconURL={post.S3Files[0]}
                title={post.title}
                author={has(post, 'authoInfo.byline') ? post.authoInfo.byline : ''}
                linkUrl={post.linkUrl}
              />))}
          </DisplayAtBreakpoint>
        </div>
      )
    }}
  />);

export default Stories;
