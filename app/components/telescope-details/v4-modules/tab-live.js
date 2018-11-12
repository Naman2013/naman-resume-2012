import React from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';

import { ObjectSummaryTile, ScheduledByTile } from 'components/common/tiles';
import { WhereInTheSky, AllSkyCamera, HowBigModule } from './';

import style from './tab-live.style';

const TabLive = ({
  renderTelescopeViewer,
}) => (
  <div>
    <DisplayAtBreakpoint screenSmall screenMedium>
      {renderTelescopeViewer()}
    </DisplayAtBreakpoint>

    <div className="tile-container">
      <ObjectSummaryTile />
    </div>

    <div className="tile-container">
      <ScheduledByTile />
    </div>

    <div className="tile-container">
      <WhereInTheSky />
    </div>

    <div className="tile-container">
      <AllSkyCamera imageURL="https://polaris.slooh.com/teide/2/highmag/2018/10/13/0555_m43/m43_20181013_055708_0_h4gimz_lrgb.png" />
    </div>

    <div className="tile-container">
      <HowBigModule />
    </div>

    <style jsx>{style}</style>
  </div>
);

TabLive.propTypes = {
  renderTelescopeViewer: PropTypes.func.isRequired,
};

export { TabLive };
