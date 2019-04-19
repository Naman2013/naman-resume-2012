import { Box } from 'app/modules/missions/components/box';
import React, { Component } from 'react';
import { AvailbleMissionTile } from '../../available-mission-tile';
import { ExplanationModal } from '../../explanation-modal';
import { MissionSuccessModal } from '../../mission-success-modal';
import { CatalogSetup } from '../catalog-setup';
import './styles.scss';

export class Catalog extends Component {
  state = {
    successModalShow: false,
  };

  componentDidMount = () => {
    const { getCatalogList } = this.props;
    getCatalogList({ callSource: 'byCatalogV4' });
  };

  componentWillUnmount() {
    this.cancelMissionSlot();
  }

  modalClose = () => {
    const { resetMissionsData } = this.props;
    this.setState({ successModalShow: false }, () => resetMissionsData());
  };

  getMissionSlot = () => {
    const { getMissionSlot } = this.props;

    getMissionSlot(
      {
        callSource: 'byCatalog',
        missionType: 'catalog',
      },
      () => this.grabedMissionTile.scrollIntoView()
    );
  };

  reserveMissionSlot = () => {
    const { reserveMissionSlot } = this.props;

    reserveMissionSlot(
      {
        callSource: 'byCatalog', //'byPopularObjects',
      },
      () => this.setState({ successModalShow: true })
    );
  };

  cancelMissionSlot = () => {
    const { cancelMissionSlot } = this.props;

    cancelMissionSlot({ callSource: 'byCatalog' });
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
      reservedMission,
      checkCatalogVisibility,
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
                  checkCatalogVisibility={checkCatalogVisibility}
                  objectData={objectData}
                  designation={designation}
                  setDesignation={setDesignation}
                  telescopeData={telescopeData}
                  setProcessingRecipe={setProcessingRecipe}
                  processingRecipe={processingRecipe}
                  disabled={missionSlot && missionSlot.missionAvailable}
                  description="Quickly schedule a mission by choosing from millions of cataloged
                  objects. Tell us what you'd like to see. We'll find the best
                  telescope to use and the best time to see it."
                />
              </Box>
            </div>
            <div
              className="col-lg-4 reserved-mission"
              ref={node => (this.grabedMissionTile = node)}
            >
              <Box inside>
                {missionSlot && missionSlot.missionAvailable ? (
                  <AvailbleMissionTile
                    missionSlot={missionSlot}
                    onCancel={this.cancelMissionSlot}
                    onSubmit={this.reserveMissionSlot}
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

        {missionSlot && !missionSlot.missionAvailable && (
          <ExplanationModal
            show
            onHide={resetMissionsData}
            text={missionSlot.explanation}
          />
        )}

        <MissionSuccessModal
          show={successModalShow}
          onHide={this.modalClose}
          reservedMissionData={reservedMissionData}
          reservedMission={reservedMission}
          missionSlot={missionSlot}
        />
      </div>
    );
  }
}
