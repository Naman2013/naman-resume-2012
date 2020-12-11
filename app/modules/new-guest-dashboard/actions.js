import { fetchLandingPageDetails } from "./guestDashboardApi";

export const FETCH_LANDING_PAGE_DETAILS_START = "FETCH_LANDING_PAGE_DETAILS_START";
export const FETCH_LANDING_PAGE_DETAILS_SUCCESS = "FETCH_LANDING_PAGE_DETAILS_SUCCESS";

const fetchLandingPageDetailsStart = () => ({
    type: FETCH_LANDING_PAGE_DETAILS_START
});

const fetchLandingPageDetailsSuccess = (payload) => ({
    type: FETCH_LANDING_PAGE_DETAILS_SUCCESS,
    payload
});

export const fetchLandingPageAction = () => (dispatch) => {
    dispatch(fetchLandingPageDetailsStart());
    return fetchLandingPageDetails({}).then(
        result => {
            if(!result.data.apiError)
                dispatch(fetchLandingPageDetailsSuccess(result.data));
        }
    )
}