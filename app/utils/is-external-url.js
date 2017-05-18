/**
  need to determine whether or not a URL is an absolute external URL?
  this happens from time to time with the API's providing a mixture of link
  types and we need to paint either an anchor, or a Link component
  */
export default function isExternalURL(URL = '') {
  return URL.indexOf('https') > -1 || URL.indexOf('http') > -1;
}
