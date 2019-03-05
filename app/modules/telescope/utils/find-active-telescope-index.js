import findIndex from 'lodash/findIndex';

function findActiveTelescopeIndex(telescopeList = [], telescopeUniqueID) {
  if (telescopeList.length === 0) { return 0; }
  return findIndex(telescopeList, telescope => telescope.telescopeUniqueID === telescopeUniqueID);
}

export { findActiveTelescopeIndex };
