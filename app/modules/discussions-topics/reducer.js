import _ from 'lodash';
import { List, Record } from 'immutable';
import createReducer from '../utils/createReducer';
import Topic from './Topic';

import {
  FETCH_TOPIC_LIST_START,
  FETCH_TOPIC_LIST_SUCCESS,
  FETCH_TOPIC_LIST_FAIL,
} from './actions';

const InitialState = Record({
  fetching: false,
  topicList: new List(),
  forumName: '',
  pages: 0,
  error: false,
});

export default createReducer(new InitialState(), {
  [FETCH_TOPIC_LIST_START](state) {
    return state
      .set('fetching', true);
  },
  [FETCH_TOPIC_LIST_SUCCESS](state, { payload }) {
    const { topics, pages, forumName } = payload;

    return state
      .set('topicList', new List(topics
        .map(json => (new Topic(json))),
      ))
      .set('pages', pages)
      .set('forumName', forumName)
      .set('fetching', false);
  },
  [FETCH_TOPIC_LIST_FAIL](state) {
    return state
      .set('error', true)
      .set('pages', 0)
      .set('forumName', '')
      .set('fetching', false);
  },
});
