function useAbsoluteURL(URL = '') {
  const safeDomain = 'slooh.com';
  const hasSloohDomain = URL.indexOf(safeDomain) > -1;
  return !hasSloohDomain;
}

export default useAbsoluteURL;
