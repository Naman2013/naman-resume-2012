// takes an observatoryList interface and returns navigation options
function buildNavigationOptions(observatoryList = []) {
  return observatoryList.reduce((navigationList, observatory) => ([
    ...navigationList,
    ...observatory.obsTelescopes.map(({ teleName, teleLogoURL, teleUniqueId }) => ({
      name: teleName,
      thumbnailURL: teleLogoURL,
      observatoryUniqueID: observatory.obsUniqueId,
      telescopeUniqueID: teleUniqueId,
    })),
  ]), []);
}

export { buildNavigationOptions };
