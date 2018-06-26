import axios from 'axios';
import { getThreadList } from '../../services/discussions/get-thread-list';
import { createThread } from '../../services/discussions/create-thread';

export const CREATE_ACTIVITY_ITEM_START = 'CREATE_ACTIVITY_ITEM_START';
export const CREATE_ACTIVITY_ITEM_SUCCESS = 'CREATE_ACTIVITY_ITEM_SUCCESS';
export const CREATE_ACTIVITY_ITEM_FAIL = 'CREATE_ACTIVITY_ITEM_FAIL';

    const createActivityStart = payload => ({
      type: CREATE_ACTIVITY_ITEM_START,
      payload,
    });

    const createActivitySuccess = payload => ({
      type: CREATE_ACTIVITY_ITEM_SUCCESS,
      payload,
    });

    const createActivityFail = payload => ({
      type: CREATE_ACTIVITY_ITEM_FAIL,
      payload,
    });

    export const createActivity = ({
      lang,
      ver,
      topicId,
      content,
      forumId,
      S3URLs,
    }) => (dispatch, getState) => {
      const { cid, at, token } = getState().user;
      dispatch(createActivityStart())
      return createThread({
        S3URLs,
        at,
        callSource: 'groups',
        cid,
        content,
        lang,
        topicId,
        token,
        forumId,
        ver,
      })
      .then(result => dispatch(createActivitySuccess(result.data)))
      .catch(error => dispatch(createActivityFail(error)));
    };
