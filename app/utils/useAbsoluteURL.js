function useAbsoluteURL(URL = '') {
  const absoluteList = ['.php', 'www.amazon.com'];
  let result = false;

  for (let i = 0; i < absoluteList.length; i += 1) {
    const currentDomain = absoluteList[i];
    if (URL.indexOf(currentDomain) > -1) {
      result = true;
      break;
    }
  }

  return result;
}

export default useAbsoluteURL;
