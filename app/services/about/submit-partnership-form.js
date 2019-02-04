import axios from 'axios';

export const SUBMIT_PARTRERSHIP_FORM = '/api/app/submitPartnershipForm';

export default function submitPartnershipForm({
  fullName,
  emailAddress,
  message,
}) {
  return axios.post(SUBMIT_PARTRERSHIP_FORM, {
    fullName,
    emailAddress,
    message,
  });
}
