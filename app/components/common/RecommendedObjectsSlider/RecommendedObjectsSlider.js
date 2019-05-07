/***********************************
 * V4 Recommended Objects Slider
 *
 *
 *
 ***********************************/
import React, { Component } from 'react';
import take from 'lodash/take';
import { FeaturedObjectCard } from 'app/modules/telescope/components/featured-object-card';
import SloohSlider from '../Slider';
import DisplayAtBreakpoint from '../DisplayAtBreakpoint';
import { getSliderProps } from './recommendedObjectsSliderConfiguration';
import './styles.scss';

export class RecommendedObjects extends Component {
  render() {
    const { missionList } = this.props;
    const sliderProps = getSliderProps(missionList);
    const shortList = take(missionList, 3) || [];
    return (
      <div className="dashboard-recomended-objects">
        <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
          <SloohSlider {...sliderProps} />
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint screenSmall>
          <div className="mobile-tiles-wrapper">
            {shortList.map(object => (
              <FeaturedObjectCard
                key={object.scheduledMissionId}
                featureObject={object}
                onOptionClick={() => this.reservationModalShow(object)}
              />
            ))}
          </div>
        </DisplayAtBreakpoint>
      </div>
    );
  }
}
