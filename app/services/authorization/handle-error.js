import axios from 'axios';

export const fetchHandleErrors = ({
  cidCheck,
  atCheck,
  tokenCheck,
  apiErrorCheck,
  errorCodeCheck,
  statusCodeCheck,
  currentPageId,
}) => (
  axios.post('/api/app/handleError', {
    cidCheck,
    atCheck,
    tokenCheck,
    apiErrorCheck,
    errorCodeCheck,
    statusCodeCheck,
    currentPageId,
  })
);
