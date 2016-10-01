import axios from 'axios';
import createReducer from './utils/createReducer';

const FETCH_ANNOUNCEMENTS = 'FETCH_ANNOUNCEMENTS';
const FETCH_ANNOUNCEMENTS_SUCCESS = 'FETCH_ANNOUNCEMENTS_SUCCESS';
const FETCH_ANNOUNCEMENTS_ERROR = 'FETCH_ANNOUNCEMENTS_ERROR';
const HIDE_ANNOUCEMENT_BANNER = 'HIDE_ANNOUCEMENT_BANNER';

const initialState = {
  messages: [],
  messageError: false,
  messageLoading: true,
  bannerDisplayed: false,
};



export const fetchAnnouncements = ( user ) => ( dispatch ) => {
  const { at, cid, token } = user;
  dispatch( startFetchAnnouncements() );
  return axios.post('/api/info/getAnnouncements', {
    at,
    cid,
    token,
    category: 'announcement',
  })
  .then( (response) => fetchAnnouncementsSuccess() )
  .catch(error => dispatch( fetchAnnouncementsError( error ) ));
};



export const startFetchAnnouncements = () => ({
  type: FETCH_ANNOUNCEMENTS,
});

export const fetchAnnouncementsSuccess = ( announcementResult ) => ({
  type: FETCH_ANNOUNCEMENTS_SUCCESS,
  messages: announcementResult.data.annoucementList,
});

export const fetchAnnouncementsError = ( error ) => ({
  type: FETCH_ANNOUNCEMENTS_ERROR
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
  [FETCH_ANNOUNCEMENTS_SUCCESS](state, { messages }) {
    return {
      ...state,
      messages,
      messageError: false,
      messageLoading: false,
    };
  },
  [FETCH_ANNOUNCEMENTS_ERROR](state, { messageError }) {
    return {
      ...state,
      messageError: true,
      messageLoading: false,
    };
  },
  [HIDE_ANNOUCEMENT_BANNER](state) {
    return {
      ...state,
      bannerDisplayed: false,
    }
  }
});
