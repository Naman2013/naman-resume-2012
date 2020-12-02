import { API } from 'app/api';

export function fetchLandingPageDetails(data) {
    return API.post('/api/page/landing', data);
}