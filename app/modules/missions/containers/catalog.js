import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Catalog } from '../components/catalog';
import {
  makeByCatalogListSelector,
  makeMissionsLoadingSelector,
  makeByCatalogListListSelectOptsSelector,
  makeByCatalogSelectedCatalogSelector,
  makeByCatalogSelectedCatalogDataSelector,
  makeByCatalogObjectDataSelector,
  makeByCatalogDesignationSelector,
  makeByCatalogTelescopeDataSelector,
  makeByCatalogProcessingRecipeSelector,
  makeMissionsFirstSlot,
  makeReservedMissionData,
  makeReservedMissionSelector,
} from '../selectors';
import {
  getCatalogList,
  checkCatalogVisibility,
  getMissionSlot,
  reserveMissionSlot,
  cancelMissionSlot,
} from '../thunks';
import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  catalogList: makeByCatalogListSelector(),
  catalogListOpts: makeByCatalogListListSelectOptsSelector(),
  selectedCatalog: makeByCatalogSelectedCatalogSelector(),
  selectedCatalogData: makeByCatalogSelectedCatalogDataSelector(),
  designation: makeByCatalogDesignationSelector(),
  objectData: makeByCatalogObjectDataSelector(),
  telescopeData: makeByCatalogTelescopeDataSelector(),
  processingRecipe: makeByCatalogProcessingRecipeSelector(),
  isFetching: makeMissionsLoadingSelector(),
  missionSlot: makeMissionsFirstSlot(),
  reservedMissionData: makeReservedMissionData(),
  reservedMission: makeReservedMissionSelector(),
});

const mapDispatchToProps = {
  getMissionSlot,
  getCatalogList,
  setCatalog: ACTION.setCatalog,
  setDesignation: ACTION.setDesignation,
  checkCatalogVisibility,
  setProcessingRecipe: ACTION.setProcessingRecipe,
  resetMissionsData: ACTION.resetMissionsData,
  reserveMissionSlot,
  cancelMissionSlot,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Catalog);
