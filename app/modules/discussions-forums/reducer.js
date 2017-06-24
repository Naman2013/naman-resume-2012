import { List, Record } from 'immutable';
import createReducer from '../utils/createReducer';
import Forum from './Forum';

import {
  FETCH_FORUM_LIST_START,
  FETCH_FORUM_LIST_SUCCESS,
  FETCH_FORUM_LIST_FAIL,
} from './actions';

const InitialState = Record({
  fetching: false,
  forumList: new List(),
  pages: 0,
  error: false,
});

export default createReducer(new InitialState(), {
  [FETCH_FORUM_LIST_START](state) {
    return state
      .set('fetching', true);
  },
  [FETCH_FORUM_LIST_SUCCESS](state, { payload }) {
    const { forums, pages } = payload;

    return state
      .set('forumList', new List(forums
        .map(json => (new Forum(json))),
      ))
      .set('pages', pages)
      .set('fetching', false);
  },
  [FETCH_FORUM_LIST_FAIL](state) {
    return state
      .set('error', true)
      .set('pages', 0)
      .set('fetching', false);
  },
});
