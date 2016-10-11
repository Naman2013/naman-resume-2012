import axios from 'axios';
import createReducer from './utils/createReducer';

const FETCH_ANNOUNCEMENTS = 'FETCH_ANNOUNCEMENTS';
const FETCH_ANNOUNCEMENTS_SUCCESS = 'FETCH_ANNOUNCEMENTS_SUCCESS';
const FETCH_ANNOUNCEMENTS_ERROR = 'FETCH_ANNOUNCEMENTS_ERROR';
const HIDE_ANNOUCEMENT_BANNER = 'HIDE_ANNOUCEMENT_BANNER';

const initialState = {
  messages: [],
  refreshIntervalSec: 600,
  messageError: false,
  messageLoading: true,
  bannerDisplayed: true,
  loadingError: null,
};

/*
  TODO: refactor this to be more general purpose for priming announcement state
  dynamic properties include:
  category
  level
  optional property: obsId
*/

export const fetchAnnouncements = ( user, obsId, category='announcement', level='observatory' ) => ( dispatch ) => {
  const { at, cid, token } = user;  
  dispatch( startFetchAnnouncements() );
  return axios.post('/api/info/getAnnouncements', {
    at,
    cid,
    token,
    obsId,
    category,
    level
  })
  .then( (response) => dispatch( fetchAnnouncementsSuccess(response) ) )
  .catch(error => dispatch( fetchAnnouncementsError( error ) ));
};



export const startFetchAnnouncements = () => ({
  type: FETCH_ANNOUNCEMENTS,
});

export const fetchAnnouncementsSuccess = ( announcementResult ) => ({
  type: FETCH_ANNOUNCEMENTS_SUCCESS,
  messages: announcementResult.data.announcementList,
  refreshIntervalSec: announcementResult.data.refreshIntervalSec,
});

export const fetchAnnouncementsError = ( error ) => ({
  type: FETCH_ANNOUNCEMENTS_ERROR,
  error,
});

export const hideBanner = () => ({
  type: HIDE_ANNOUCEMENT_BANNER,
});



export default createReducer(initialState, {
  [FETCH_ANNOUNCEMENTS](state) {
    return {
      ...state,
      messageError: false,
      messageLoading: true,
    };
  },
  [FETCH_ANNOUNCEMENTS_SUCCESS](state, { messages, refreshIntervalSec }) {
    return {
      ...state,
      messages,
      refreshIntervalSec,
      messageError: false,
      messageLoading: false,
    };
  },
  [FETCH_ANNOUNCEMENTS_ERROR](state, { error }) {
    return {
      ...state,
      messageError: true,
      messageLoading: false,
      loadingError: error,
    };
  },
  [HIDE_ANNOUCEMENT_BANNER](state) {
    return {
      ...state,
      bannerDisplayed: false,
    }
  }
});
