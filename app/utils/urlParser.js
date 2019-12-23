export const getRelativePath = url => {
  try {
    const urlObject = new URL(url, window.location.origin);
    return urlObject.pathname;
  } catch (e) {
    return null;
  }
};
