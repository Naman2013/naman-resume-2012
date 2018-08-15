// API doc: https://docs.google.com/document/d/13_xW9Tw7Tu4yKA8t4EkURTiXfgiTWXzLxK41BGKEPGM
import axios from 'axios';
import store from '../store';

const TOGGLE_READING_LIST_URL = '/api/readinglists/toggleReadingListItem';

export default TOGGLE_READING_LIST_URL;
export const SHOW = 'show';
export const STORY = 'story';
export const GUIDE = 'guide';

export function toggleReadingListState({
  readingListType,
  listItemId,
}) {
  const { user: { at, cid, token } } = store.getState();
  return axios.post(TOGGLE_READING_LIST_URL, {
    cid,
    at,
    token,
    readingListType,
    listItemId,
  });
}
