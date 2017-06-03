import axios from 'axios';

const DEFAULT_LANG = 'en';
const DEFAULT_STATUS = 'live';
const DEFAULT_LIST_TYPE = 'full';

export default function fetchObservatoryList({
  at,
  cid,
  token,
  callSource,
}) {
  return axios.post({
    at,
    cid,
    token,
    callSource,
    lang: DEFAULT_LANG,
    status: DEFAULT_STATUS,
    listType: DEFAULT_LIST_TYPE,
  });
}
