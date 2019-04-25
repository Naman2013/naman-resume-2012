import React, { PureComponent, Fragment } from 'react';
import { FeaturedObjectCard } from '../featured-object-card';
import './styles.scss';

export class FeaturedObjects extends PureComponent {
  render() {
    const { currentTelescope, featuredObjectsData } = this.props;
    const { teleName } = currentTelescope;
    const { missionCount, missionList } = featuredObjectsData;

    return (
      <div className="featured-objects">
        <h3 className="featured-objects-title h3-custom">
          {`Featured objects on ${teleName} `}
          <span>({missionCount})</span>
        </h3>

        <div className="featured-objects-slider">
          {missionList.map(item => (
            <FeaturedObjectCard
              key={item.scheduledMissionId}
              featureObject={item}
            />
          ))}
        </div>
      </div>
    );
  }
}
