const DEFAULT_ACTIVE_TELESCOPE = {
  name: '',
  observatoryUniqueID: '',
  telescopeUniqueID: '',
  thumbnailURL: '',
};

function getActiveTelescopeConfig(telescopeConfig, telescope) {
  if (!telescope) {
    return {
      ...DEFAULT_ACTIVE_TELESCOPE,
      isValidTelescope: false,
    };
  }

  return {
    ...telescopeConfig[telescope.telescopeUniqueID],
    isValidTelescope: true,
  };
}

export { getActiveTelescopeConfig };
