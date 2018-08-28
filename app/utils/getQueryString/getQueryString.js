import queryString from 'query-string';

export default function getQueryString(search = '{}') {
  return queryString.parse(search);
}
