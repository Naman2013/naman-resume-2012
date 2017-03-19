import _ from 'lodash';
import { List, Record } from 'immutable';
import createReducer from '../utils/createReducer';
import TopicListItem from './TopicListItem';
import ForumListItem from './ForumListItem';

import {
  FETCH_FORUM_TOPIC_LIST_SUCCESS,
  FETCH_FORUM_TOPIC_LIST_FAIL,
  NEW_THREAD_START,
  NEW_THREAD_SUCCESS,
  NEW_THREAD_FAIL,
  RESET_NEW_TREAD_STATE,
} from './actions';

const InitialState = Record({
  submitting: false,
  postUUID: '',
  forumList: new List(),
  forumStatus: '',
  submitError: '',
  threadSubmitted: false,
});

export default createReducer(new InitialState(), {
  [FETCH_FORUM_TOPIC_LIST_SUCCESS](state, { payload }) {
    const { forumList, forumStatus, postUUID } = payload;
    const newForumList = new List(forumList
      .map((json) => {
        const immutableForumTopicList = json.forumTopicList.map(
          topicListJson => new TopicListItem(topicListJson),
        );
        return new ForumListItem(Object.assign(json, { forumTopicList: immutableForumTopicList }));
      }),
    );
    return state
      .set('forumList', newForumList)
      .set('postUUID', postUUID)
      .set('forumStatus', forumStatus);
  },
  [FETCH_FORUM_TOPIC_LIST_FAIL](state, { payload }) {
    return state
    .set('forumTopicList', new List())
    .set('forumList', new List())
    .set('postUUID', '')
    .set('forumStatus', '');
  },
  [NEW_THREAD_START](state) {
    return state
      .set('submitting', true)
      .set('submitError', '');
  },
  [NEW_THREAD_SUCCESS](state, { payload }) {
    return state
      .set('submitting', false)
       .set('submitError', payload.errorMsg);
  },
  [NEW_THREAD_FAIL](state, { payload }) {
    return state
    .set('submitting', false)
    .set('submitError', payload.errorMsg);
  },
  [RESET_NEW_TREAD_STATE](state) {
    return state
    .set('forumList', new List())
    .set('submitError', '')
    .set('submitting', false)
    .set('postUUID', false)
    .set('threadSubmitted', false);
  },
});
