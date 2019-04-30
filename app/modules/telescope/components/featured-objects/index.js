import React, { PureComponent, Fragment } from 'react';
import Slider from 'react-slick';
import getDefaultConfig from 'app/components/common/Slider/sliderConfig';
import { FeaturedObjectCard } from '../featured-object-card';
import { sliderResponsiveConfig } from 'app/styles/variables/slider-config';
import './styles.scss';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`icon-slider-right ${className}`}
      style={style}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`icon-slider-left ${className}`}
      style={style}
      onClick={onClick}
    />
  );
}

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
          <Slider 
            {...defaultSliderConfig}
            {...sliderResponsiveConfig}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
            dots
          >
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
