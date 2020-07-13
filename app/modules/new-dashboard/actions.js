import fetchStartPartyList from "./dashboardApi";

export const FETCH_STAR_PARTY_LIST_START = "FETCH_START_PARTY_LIST_START";
export const FETCH_STAR_PARTY_LIST_SUCCESS = "FETCH_START_PARTY_LIST_SUCCESS";

const fetchStartPartyListStart = () => ({
    type: FETCH_STAR_PARTY_LIST_START    
});

const fetchStartPartyListSuccess = (payload) => ({
    type: FETCH_STAR_PARTY_LIST_SUCCESS,
    payload    
});

export const fetchStarPartyDataAction = () => (dispatch) => {
    dispatch(fetchStartPartyListStart());
    return fetchStartPartyList({}).then(
      result => {          
        dispatch(fetchStartPartyListSuccess(result.data));
      }
    );
  };