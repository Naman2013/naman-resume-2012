/***********************************
 * V4 Recommended Groups Slider
 *
 *
 *
 ***********************************/
import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import take from 'lodash/take';
import SloohSlider from 'app/components/common/Slider';
import Request from 'app/components/common/network/Request';
import GroupTile from 'app/components/common/tiles/GroupTile';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import { GET_GROUPS, SORT_BY_POPULAR } from 'app/services/community-groups';
import { getSliderProps } from './recommendedGroupsSliderConfiguration';

const Groups = ({}) => (
  <Request
    serviceURL={GET_GROUPS}
    method="POST"
    requestBody={SORT_BY_POPULAR}
    render={({ fetchingContent, serviceResponse }) => {
      const sliderProps = getSliderProps(serviceResponse.groups);
      const shortList = take(serviceResponse.groups, 2) || [];
      return (
        <div className="root">
          <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
            <SloohSlider {...sliderProps} />
          </DisplayAtBreakpoint>
          <DisplayAtBreakpoint screenSmall>
            {shortList.map(group => (
              <GroupTile
                accessDescription={group.accessDescription}
                iconURL={group.iconUrl}
                key={uniqueId()}
                linkUrl={group.linkUrl}
                title={group.title}
              />
            ))}
          </DisplayAtBreakpoint>
          <style jsx>{`
            .root {
              margin: 0 auto;
              max-width: 644px;
            }
            @media only screen and (min-width: 1200px) {
              .root {
                max-width: 965px;
              }
            }
          `}</style>
        </div>
      );
    }}
  />
);

export default Groups;
