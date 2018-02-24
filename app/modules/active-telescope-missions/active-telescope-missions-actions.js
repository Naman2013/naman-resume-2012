import axios from 'axios';

import { fetchObjectContent, fetchContentReset } from '../community-content/community-object-content-actions';
import { fetchObjectDataAction } from '../object-details/actions';

export const UPDATE_TELESCOPE_MISSION_FULL_START = 'UPDATE_TELESCOPE_MISSION_FULL_START';
export const UPDATE_TELESCOPE_MISSION_COMPACT_START = 'UPDATE_TELESCOPE_MISSION_COMPACT_START';
export const UPDATE_TELESCOPE_MISSION_FAIL = 'UPDATE_TELESCOPE_MISSION_FAIL';
export const COMMIT_ACTIVE_MISSION_CHANGE = 'COMMIT_ACTIVE_MISSION_CHANGE';
export const REMOVE_TELESCOPE_MISSION = 'REMOVE_TELESCOPE_MISSION';

export const UPDATE_ACTIVE_TELESCOPE_MISSION_ID = 'UPDATE_ACTIVE_TELESCOPE_MISSION_ID';
export const RESET_ACTIVE_TELESCOPE_MISSION_ID = 'RESET_ACTIVE_TELESCOPE_MISSION_ID';

export const SET_ACTIVE_TELESCOPE_MISSION = 'SET_ACTIVE_TELESCOPE_MISSION';
export const RESET_ACTIVE_MISSION = 'RESET_ACTIVE_MISSION';

export const FORMAT_COMPACT = 'compact';
export const FORMAT_FULL = 'full';

const setActiveTelescopeMission = payload => ({
  type: SET_ACTIVE_TELESCOPE_MISSION,
  payload,
});

export const resetActiveMission = () => ({
  type: RESET_ACTIVE_MISSION,
});

const fetchingMissionCompact = ({ telescopeId }) => ({
  type: UPDATE_TELESCOPE_MISSION_COMPACT_START,
  telescopeId,
});

const fetchingMissionFull = error => ({
  type: UPDATE_TELESCOPE_MISSION_FAIL,
  payload: error,
});

const fetchingMissionData = ({ telescopeId, format }) => (dispatch) => {
  if (format === FORMAT_COMPACT) {
    dispatch(fetchingMissionCompact({ telescopeId }));
  }
  if (format === FORMAT_FULL) {
    dispatch(fetchingMissionFull({ telescopeId }));
  }
};

const commitActiveMissionChange = payload => ({
  type: COMMIT_ACTIVE_MISSION_CHANGE,
  payload,
});

const failedFetchMission = error => (dispatch) => {
  // reset the community content
  dispatch(fetchContentReset());
  return {
    type: UPDATE_TELESCOPE_MISSION_FAIL,
    payload: error,
  };
};

const updateActiveMissionCompact = ({ telescopeId, payload }) => (dispatch, getState) => {
  const { telescopes } = getState().activeTelescopeMissions;
  let updatedTelescopes = telescopes;
  if (telescopes.some(telescope => telescope.telescopeId === telescopeId)) {
    updatedTelescopes = telescopes.map((telescope) => {
      if (telescope.telescopeId === telescopeId) {
        return Object.assign(telescope, {
          activeMission: {
            ...telescope.activeMission,
            compact: payload,
            compactError: {},
            fetchingCompact: false,
          },
        });
      }
      return telescope;
    });
  } else {
    updatedTelescopes.push({
      telescopeId,
      activeMission: {
        full: {},
        fullError: {},
        fetchingFull: false,
        compact: payload,
        compactError: {},
        fetchingCompact: false,
      },
    });
  }

  dispatch(commitActiveMissionChange(updatedTelescopes));
};

/**
  see documentation:
  https://docs.google.com/document/d/1rBvwVp2sRhtQMpVOy-xfjAs2oPCvbH-rV9cnnKwFMDM/edit#
*/
export const updateTelescopeActiveMission = ({
  telescopeId,
  obsId,
  domeId,
  format,
  scheduledMissionId,
}) => (dispatch, getState) => {
  const { token, cid, at } = getState().user;

  dispatch(fetchingMissionData({
    telescopeId,
    format,
  }));

  dispatch(fetchContentReset());

  return axios.post('/api/reservation/getCurrentMission', {
    token,
    cid,
    at,
    telescopeId,
    obsId,
    domeId,
    format,
    scheduledMissionId,
  })
  .then((result) => {
    if (format === FORMAT_COMPACT) {
      dispatch(updateActiveMissionCompact({ telescopeId, payload: result.data }));
    }

    if (format === FORMAT_FULL) {
      const hasMission = result.data.missionList.length > 0;
      const currentMission = Object.assign({
        timestamp: result.data.timestamp,
      }, result.data.missionList[0]);

      if (!result.data.apiError) {
        dispatch(setActiveTelescopeMission(currentMission));

        // if we have a mission, fetch the community content...
        if (hasMission) {
          const { objectId } = currentMission;
          const callSource = 'telescopeDetails';

          // get the community posts associated with this object
          dispatch(fetchObjectContent({
            objectId,
            callSource,
          }));

          // get the meta data associated with this object
          dispatch(fetchObjectDataAction(objectId));
        }
      } else {
        dispatch(resetActiveMission());
      }
    }
  })
  .catch(error => dispatch(failedFetchMission(error)));
};

export const setActiveTelescopeMissionID = telescopeMissionID => ({
  type: UPDATE_ACTIVE_TELESCOPE_MISSION_ID,
  payload: telescopeMissionID,
});

export const resetActiveTelescopeMissionID = () => ({
  type: RESET_ACTIVE_TELESCOPE_MISSION_ID,
});
