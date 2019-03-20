// takes an observatoryList interface and returns navigation options
function buildNavigationOptions(observatoryList = []) {
  return observatoryList.reduce(
    (navigationList, observatory) => [
      ...navigationList,
      ...observatory.obsTelescopes
        .map(
          ({
            teleHasTelescopePage,
            teleName,
            teleLogoURL,
            teleUniqueId,
            teleInstrumentList,
          }) => {
            return {
              name: teleName,
              thumbnailURL: teleLogoURL,
              observatoryUniqueID: observatory.obsUniqueId,
              telescopeUniqueID: teleUniqueId,
              show: teleHasTelescopePage,
              instruments: teleInstrumentList,
              AllskyTimelapseWidgetId: observatory.AllskyTimelapseWidgetId,
              observatoryData: { ...observatory },
            };
          }
        )
        .filter(telescope => {
          return telescope.show;
        }),
    ],
    []
  );
}

export { buildNavigationOptions };
