import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';

import { ObjectSummaryTile, ScheduledByTile } from 'components/common/tiles';
import { WhereInTheSky, ConnectedAllSkyCamera, HowBigModule } from './';

import style from './tab-live.style';

const TabLive = ({
  mission,
  object,
  obsId,
  skyChartWidgetID,
  allSkyWidgetID,
  renderTelescopeViewer,
}) => (
  <div>
    <DisplayAtBreakpoint screenSmall screenMedium>
      {renderTelescopeViewer()}
    </DisplayAtBreakpoint>

    {
      mission.missionAvailable &&
        <Fragment>
          <div className="tile-container">
            <ScheduledByTile
              scheduledBy={mission.ownerDisplayName}
              targetName={mission.objectTitle}
              likeCount={mission.missionLikeCount}
            />
          </div>
        </Fragment>
      }

      {
          mission.objectId != 0 && object.objectTitle &&
        <div className="tile-container">
          <ObjectSummaryTile {...object}/>
        </div>
      }

    <div className="tile-container">
      <ConnectedAllSkyCamera
        obsId={obsId}
        allSkyWidgetID={allSkyWidgetID}
      />
    </div>

    <div className="tile-container">
      <HowBigModule />
    </div>

    {
      mission.missionAvailable &&
        <Fragment>
          <div className="tile-container">
            <WhereInTheSky
              obsId={obsId}
              AllskyWidgetId={skyChartWidgetID}
              scheduledMissionId={mission.scheduledMissionId}
            />
          </div>
        </Fragment>
    }

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
