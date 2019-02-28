function getTelescope(observatory, telescopeUniqueID) {
  return observatory.obsTelescopes.find(telescope => telescope.teleUniqueId === telescopeUniqueID);
}

function getActiveInstrument(
  observatoryList = [],
  activeTelescope = { observatoryUniqueID: undefined, telescopeUniqueID: undefined }
) {
  const obsInfo = observatoryList
    .find(obs => obs.obsUniqueId === activeTelescope.observatoryUniqueID);
  const telescope = getTelescope(obsInfo, activeTelescope.telescopeUniqueID);
  return telescope.teleInstrumentList[0];
}

export { getActiveInstrument };
