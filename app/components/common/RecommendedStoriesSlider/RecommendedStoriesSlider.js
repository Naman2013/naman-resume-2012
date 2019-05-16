/***********************************
 * V4 Recommended Stories Slider
 *
 *
 *
 ***********************************/

import React from 'react';
import has from 'lodash/has';
import take from 'lodash/take';
import SloohSlider from '../../../components/common/Slider';
import DisplayAtBreakpoint from '../../../components/common/DisplayAtBreakpoint';
import Request from '../../../components/common/network/Request';
import { GET_BEST_OF } from '../../../services/dashboard';
import StoryTile from '../../../components/common/tiles/StoryTile';
import { getSliderProps } from './recommendedStoriesSliderConfiguration';

const Stories = () => (
  <Request
    serviceURL={GET_BEST_OF}
    method="POST"
    render={({ serviceResponse }) => {
      const sliderProps = getSliderProps(serviceResponse.posts);
      const shortList = take(serviceResponse.posts, 2) || [];
      return (
        <div className="root">
          <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
            <SloohSlider {...sliderProps} />
          </DisplayAtBreakpoint>
          <DisplayAtBreakpoint screenSmall>
            {shortList.map(post => (
              <StoryTile
                key={post.postId}
                storyId={post.postId}
                iconURL={post.slugIconURL}
                title={post.title}
                author={
                  has(post, 'authorInfo.displayName')
                    ? post.authorInfo.displayName
                    : ''
                }
                // linkUrl={post.linkUrl}
              />
            ))}
          </DisplayAtBreakpoint>
          <style jsx>{`
            .root {
              margin: 0 auto;
              max-width: 620px;
            }
            @media only screen and (min-width: 1100px) {
              .root {
                max-width: 940px;
              }
            }
          `}</style>
        </div>
      );
    }}
  />
);

export default Stories;
