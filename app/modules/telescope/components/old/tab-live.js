import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import MissionAudio from 'app/components/telescope-details/MissionAudio';

import {
  ObjectSummaryTile,
  ScheduledByTile,
} from 'app/components/common/tiles';
import SunsetCountdown from 'app/components/telescope-details/SunsetCountdown';
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
  activeInstrument,
  currentObservatory,
  currentMissionCountdown,
  fetchAllTelescopeStatus,
  user,
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

    {mission.missionAvailable && (
      <div className="tile-container">
        <MissionAudio
          missionAudioURL={object.objectAudioURL}
          audioEnabled={mission.objectId !== 0 && !!object.objectAudioURL}
        />
      </div>
    )}

    {mission.objectId !== 0 && object && object.objectTitle && (
      <div className="tile-container">
        <ObjectSummaryTile {...object} user={user} />
      </div>
    )}

    {activeInstrument.instrImageSourceType === 'video' &&
      currentMissionCountdown &&
      currentMissionCountdown.showCountdown && (
        <div className="tile-container">
          <SunsetCountdown
            label={currentMissionCountdown.countdownLabel}
            countdownTimestamp={currentMissionCountdown.countdownTimestamp}
            onExpired={fetchAllTelescopeStatus}
          />
        </div>
      )}

    <div className="tile-container">
      <ConnectedAllSkyCamera
        obsId={obsId}
        allSkyWidgetID={allSkyWidgetID}
        AllskyTimelapseWidgetId={activeTelescope.AllskyTimelapseWidgetId}
      />
    </div>
    {/* {mission.objectId && (
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
    )} */}

    {/*mission.missionAvailable && (
      <Fragment>
        <div className="tile-container">
          <WhereInTheSky
            obsId={obsId}
            AllskyWidgetId={skyChartWidgetID}
            scheduledMissionId={mission.scheduledMissionId}
          />
        </div>
      </Fragment>
    )*/}

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
