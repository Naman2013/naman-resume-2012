// takes an observatoryList interface and returns navigation options
function buildNavigationOptions(observatoryList = []) {
  return observatoryList.reduce(
    (navigationList, observatory) => [
      ...navigationList,
      ...observatory.obsTelescopes
        .map(
          ({ teleHasTelescopePage, teleName, teleLogoURL, teleUniqueId }) => ({
            name: teleName,
            thumbnailURL: teleLogoURL,
            observatoryUniqueID: observatory.obsUniqueId,
            telescopeUniqueID: teleUniqueId,
            show: teleHasTelescopePage,
            AllskyTimelapseWidgetId: observatory.AllskyTimelapseWidgetId,
          })
        )
        .filter(telescope => {
          return telescope.show;
        }),
    ],
    []
  );
}

export { buildNavigationOptions };
