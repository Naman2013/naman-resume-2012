import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';

import {
  ObjectSummaryTile,
  ScheduledByTile,
} from 'app/components/common/tiles';
import { WhereInTheSky, ConnectedAllSkyCamera, HowBigModule } from './index';

import style from './tab-live.style';

const TabLive = ({
  mission,
  obsId,
  skyChartWidgetID,
  allSkyWidgetID,
  renderTelescopeViewer,
}) => (
  <div>
    <DisplayAtBreakpoint screenSmall screenMedium>
      {renderTelescopeViewer()}
    </DisplayAtBreakpoint>

    <div className="tile-container">
      <ObjectSummaryTile />
    </div>

    {mission.missionAvailable && (
      <Fragment>
        <div className="tile-container">
          <ScheduledByTile
            scheduledBy={mission.ownerDisplayName}
            targetName={mission.objectTitle}
            likeCount={mission.missionLikeCount}
          />
        </div>

        <div className="tile-container">
          <WhereInTheSky
            obsId={obsId}
            AllskyWidgetId={skyChartWidgetID}
            scheduledMissionId={mission.scheduledMissionId}
          />
        </div>
      </Fragment>
    )}

    <div className="tile-container">
      <ConnectedAllSkyCamera obsId={obsId} allSkyWidgetID={allSkyWidgetID} />
    </div>

    <div className="tile-container">
      <HowBigModule />
    </div>

    <style jsx>{style}</style>
  </div>
);

TabLive.propTypes = {
  obsId: PropTypes.string.isRequired,
  skyChartWidgetID: PropTypes.string.isRequired,
  allSkyWidgetID: PropTypes.string.isRequired,
  mission: PropTypes.shape({
    missionAvailable: PropTypes.bool,
    objectTitle: PropTypes.string,
    ownerDisplayName: PropTypes.string,
    missionLikeCount: PropTypes.number,
    scheduledMissionId: PropTypes.string,
  }),
  renderTelescopeViewer: PropTypes.func.isRequired,
};

TabLive.defaultProps = {
  mission: {
    missionAvailable: false,
    objectTitle: '',
    ownerDisplayName: '',
  },
};

export { TabLive };
