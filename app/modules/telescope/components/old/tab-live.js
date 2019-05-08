import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';

import {
  ObjectSummaryTile,
  ScheduledByTile,
} from 'app/components/common/tiles';
import { OBJECT_HOW_BIG } from '../../../../services/objects';
import Request from '../../../../components/common/network/Request';

import { WhereInTheSky, ConnectedAllSkyCamera, HowBigModule } from './index';

import style from './tab-live.style';

const TabLive = ({
  mission,
  object,
  obsId,
  skyChartWidgetID,
  allSkyWidgetID,
  renderTelescopeViewer,
  activeTelescope,
}) => (
  <div>
    <DisplayAtBreakpoint screenSmall screenMedium>
      {renderTelescopeViewer()}
    </DisplayAtBreakpoint>

    {mission.missionAvailable && (
      <Fragment>
        <div className="tile-container">
          <ScheduledByTile
            scheduledBy={mission.ownerDisplayName}
            targetName={mission.objectTitle}
            likeCount={mission.missionLikeCount}
          />
        </div>
      </Fragment>
    )}

    {mission.objectId !== 0 && object && object.objectTitle && (
      <div className="tile-container">
        <ObjectSummaryTile {...object} />
      </div>
    )}

    <div className="tile-container">
      <ConnectedAllSkyCamera
        obsId={obsId}
        allSkyWidgetID={allSkyWidgetID}
        AllskyTimelapseWidgetId={activeTelescope.AllskyTimelapseWidgetId}
      />
    </div>
    {mission.objectId && (
      <div className="tile-container">
        <Request
          serviceURL={OBJECT_HOW_BIG}
          requestBody={{ objectId: mission.objectId }}
          withoutUser
          render={({ fetchingContent, serviceResponse: resp }) => (
            <div className="root">
              {!fetchingContent && (
                <HowBigModule {...resp} {...resp.howBigData} />
              )}
            </div>
          )}
        />
      </div>
    )}

    {mission.missionAvailable && (
      <Fragment>
        <div className="tile-container">
          <WhereInTheSky
            obsId={obsId}
            AllskyWidgetId={skyChartWidgetID}
            scheduledMissionId={mission.scheduledMissionId}
          />
        </div>
      </Fragment>
    )}

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
