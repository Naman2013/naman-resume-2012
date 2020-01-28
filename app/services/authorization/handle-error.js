import { API } from 'app/api';

export const fetchHandleErrors = ({
  cidCheck,
  atCheck,
  tokenCheck,
  apiErrorCheck,
  errorCodeCheck,
  statusCodeCheck,
  currentPageId,
}) =>
  API.post('/api/app/handleError', {
    cidCheck,
    atCheck,
    tokenCheck,
    apiErrorCheck,
    errorCodeCheck,
    statusCodeCheck,
    currentPageId,
  });
