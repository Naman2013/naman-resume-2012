import { fetchLandingPageDetails, getSubscriptionPlans } from "./guestDashboardApi";

export const FETCH_LANDING_PAGE_DETAILS_START = "FETCH_LANDING_PAGE_DETAILS_START";
export const FETCH_LANDING_PAGE_DETAILS_SUCCESS = "FETCH_LANDING_PAGE_DETAILS_SUCCESS";
export const FETCH_SUBSCRIPTION_PLAN_START = "FETCH_SUBSCRIPTION_PLAN_START";
export const FETCH_SUBSCRIPTION_PLAN_SUCCESS = "FETCH_SUBSCRIPTION_PLAN_SUCCESS";



const fetchLandingPageDetailsStart = () => ({
    type: FETCH_LANDING_PAGE_DETAILS_START
});

const fetchLandingPageDetailsSuccess = (payload) => ({
    type: FETCH_LANDING_PAGE_DETAILS_SUCCESS,
    payload
});

const fetchSubscriptionPlanStart = () => ({
    type: FETCH_SUBSCRIPTION_PLAN_START
});

const fetchSubscriptionPlanSuccess = (payload) => ({
    type: FETCH_SUBSCRIPTION_PLAN_SUCCESS,
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

export const fetchSubscriptionPlan = (data) => (dispatch) => {
    dispatch(fetchSubscriptionPlanStart());
    return getSubscriptionPlans(data).then(
        result => {
            if(!result.data.apiError)
                dispatch(fetchSubscriptionPlanSuccess(result.data));
        }
    )
}