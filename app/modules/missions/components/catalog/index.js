import { Box } from 'app/modules/missions/components/box';
import { CatalogSetup } from 'app/modules/missions/components/catalog-setup';
import React, { Component } from 'react';
import moment from 'moment';
import { AvailbleMissionTile } from '../available-mission-tile';
import { MissionSuccessModal } from '../mission-success-modal';
import './styles.scss';

export class Catalog extends Component {
  state = {
    successModalShow: false,
  };

  componentDidMount = () => {
    const { getCatalogList, resetMissionsData } = this.props;
    resetMissionsData();
    getCatalogList();
  };

  checkCatalogVisibility = designation => {
    const { checkCatalogVisibility, selectedCatalogData } = this.props;
    const { catName, catalog } = selectedCatalogData;
    checkCatalogVisibility({ catName, catalog, designation });
  };

  getMissionDate = timestamp => moment.unix(timestamp).format('ddd. MMM. DD');

  getMissionTime = timestamp => moment.unix(timestamp).format('HH:mm');

  modalClose = () => {
    const { resetMissionsData } = this.props;
    this.setState({ successModalShow: false }, () => resetMissionsData());
  };

  getMissionSlot = () => {
    const {
      getMissionSlot,
      selectedCatalogData,
      designation,
      objectData,
      processingRecipe,
    } = this.props;
    const { catName, catalog } = selectedCatalogData;
    const {
      domeId,
      missionStart,
      objectDec,
      objectRA,
      obsId,
      scheduledMissionId,
      telescopeId,
    } = objectData;

    getMissionSlot({
      callSource: 'byCatalog',
      catName,
      catalog,
      designation,
      domeId,
      missionStart,
      missionType: 'catalog',
      objectDec,
      objectRA,
      obsId,
      processingRecipe: processingRecipe.presetOption,
      scheduledMissionId,
      telescopeId,
    }).then(() =>
      document.getElementById('grabedMissionTile').scrollIntoView()
    );
  };

  reserveMissionSlot = () => {
    const { reserveMissionSlot, missionSlot } = this.props;

    reserveMissionSlot({
      callSource: 'byPopularObjects',
      catName: missionSlot.catName,
      catalog: missionSlot.catalog,
      designation: missionSlot.designation,
      domeId: missionSlot.domeId,
      missionStart: missionSlot.missionStart,
      missionType: missionSlot.missionType,
      objectDec: missionSlot.objectDec,
      objectIconURL: missionSlot.objectIconURL,
      objectId: missionSlot.objectId,
      objectRA: missionSlot.objectRA,
      objectTitle: missionSlot.title,
      objectType: missionSlot.objectType,
      objective: '',
      obsId: missionSlot.obsId,
      obsName: missionSlot.obsName,
      processingRecipe: missionSlot.processingRecipe,
      scheduledMissionId: missionSlot.scheduledMissionId,
      targetName: missionSlot.targetName,
      telescopeId: missionSlot.telescopeId,
      telescopeName: missionSlot.telescopeName,
      uniqueId: missionSlot.uniqueId,
    }).then(() => this.setState({ successModalShow: true }));
  };

  render() {
    const {
      catalogListOpts,
      setCatalog,
      missionSlot,
      resetMissionsData,
      selectedCatalog,
      selectedCatalogData,
      reservedMissionData,
      objectData,
      setDesignation,
      designation,
      telescopeData,
      setProcessingRecipe,
      processingRecipe,
    } = this.props;

    const { successModalShow } = this.state;

    return (
      <div className="catalog">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Box>
                <CatalogSetup
                  catalogListOpts={catalogListOpts}
                  setCatalog={setCatalog}
                  getMissionSlot={this.getMissionSlot}
                  selectedCatalog={selectedCatalog}
                  selectedCatalogData={selectedCatalogData}
                  checkCatalogVisibility={this.checkCatalogVisibility}
                  objectData={objectData}
                  designation={designation}
                  setDesignation={setDesignation}
                  telescopeData={telescopeData}
                  setProcessingRecipe={setProcessingRecipe}
                  processingRecipe={processingRecipe}
                />
              </Box>
            </div>
            <div className="col-lg-4 reserved-mission" id="grabedMissionTile">
              <Box inside>
                {missionSlot && missionSlot.missionAvailable ? (
                  <AvailbleMissionTile
                    title={missionSlot.title}
                    telescope={missionSlot.telescopeName}
                    description={missionSlot.explanation}
                    date={this.getMissionDate(missionSlot.missionStart)}
                    time={this.getMissionTime(missionSlot.missionStart)}
                    cancel={resetMissionsData}
                    scheduleMission={this.reserveMissionSlot}
                  />
                ) : (
                  <div className="reserved-mission-gag">
                    YOUR MISSION WILL APPEAR HERE
                  </div>
                )}
              </Box>
            </div>
          </div>
        </div>

        <MissionSuccessModal
          show={successModalShow}
          onHide={this.modalClose}
          reservedMissionData={reservedMissionData}
        />
      </div>
    );
  }
}
