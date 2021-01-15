import { API } from 'app/api';
import { SUBSCRIPTION_PLANS_ENDPOINT_URL } from 'app/services/registration/registration';

export function fetchLandingPageDetails(data) {
    return API.post('/api/page/landing', data);
}

export function getSubscriptionPlans(data) {
    return API.post(SUBSCRIPTION_PLANS_ENDPOINT_URL, data);
}