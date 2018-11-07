// takes an observatoryList interface and returns navigation options
function buildNavigationOptions(observatoryList = []) {
  return observatoryList.reduce((navigationList, observatory) => ([
    ...navigationList,
    ...observatory.obsTelescopes.map(({ teleName, teleLogoURL }) => ({
      name: teleName,
      thumbnailURL: teleLogoURL,
    })),
  ]), []);
}

export { buildNavigationOptions };
