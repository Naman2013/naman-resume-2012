import React, { PureComponent, Fragment } from 'react';
import Slider from 'react-slick';
import getDefaultConfig from 'app/components/common/Slider/sliderConfig';
import { FeaturedObjectCard } from '../featured-object-card';
import { sliderResponsiveConfig } from 'app/styles/variables/slider-config';
import './styles.scss';

export class FeaturedObjects extends PureComponent {
  render() {
    const { currentTelescope, featuredObjectsData } = this.props;
    const { teleName } = currentTelescope;
    const { missionCount, missionList } = featuredObjectsData;
    const defaultSliderConfig = getDefaultConfig();

    return (
      <div className="featured-objects">
        <h3 className="featured-objects-title h3-custom">
          {`Featured objects on ${teleName} `}
          <span>({missionCount})</span>
        </h3>

        <div className="featured-objects-slider">
          <Slider {...defaultSliderConfig} {...sliderResponsiveConfig}>
            {missionList.map(item => (
              <FeaturedObjectCard
                key={item.scheduledMissionId}
                featureObject={item}
              />
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}
