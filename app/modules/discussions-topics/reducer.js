import { List, Record } from 'immutable';
import createReducer from '../utils/createReducer';
import Topic from './Topic';

import {
  FETCH_TOPIC_LIST_START,
  FETCH_TOPIC_LIST_SUCCESS,
  FETCH_TOPIC_LIST_FAIL,
  TOGGLE_FOLLOW_TOPIC_SUCCESS,
} from './actions';

const InitialState = Record({
  fetching: false,
  topicList: new List(),
  forumName: '',
  page: 0,
  resultsCount: 0,
  error: false,
});

export default createReducer(new InitialState(), {
  [FETCH_TOPIC_LIST_START](state, { payload }) {
    const { appendToList } = payload;
    return state
      .set('topicList', appendToList ? state.topicList : new List()) // clear out current list if it isnt pagination
      .set('fetching', true);
  },
  [FETCH_TOPIC_LIST_SUCCESS](state, { payload }) {
    const { topics, forumName, resultsCount, page, appendToList } = payload;
    const newTopics = new List(topics
      .map(json => (new Topic(json))),
    );
    return state
      .set('topicList', appendToList ? state.topicList.concat(newTopics) : newTopics)
      .set('resultsCount', resultsCount)
      .set('forumName', forumName)
      .set('page', page)
      .set('fetching', false);
  },
  [FETCH_TOPIC_LIST_FAIL](state) {
    return state
      .set('error', true)
      .set('forumName', '')
      .set('page', 0)
      .set('resultsCount', 0)
      .set('fetching', false);
  },
  [TOGGLE_FOLLOW_TOPIC_SUCCESS](state, { payload }) {
    const { followingFlag, topicId } = payload;
    return state
      .update('topicList', list =>
        list.update(list.findIndex(topic => Number(topic.topicId) === Number(topicId)), topic =>
          topic.set('followingFlag', followingFlag)));
  },
});
