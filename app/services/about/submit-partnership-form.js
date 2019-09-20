import { API } from 'app/api';

export const SUBMIT_PARTRERSHIP_FORM = '/api/app/submitPartnershipForm';

export default function submitPartnershipForm({
  fullName,
  emailAddress,
  message,
}) {
  return API.post(SUBMIT_PARTRERSHIP_FORM, {
    fullName,
    emailAddress,
    message,
  });
}
