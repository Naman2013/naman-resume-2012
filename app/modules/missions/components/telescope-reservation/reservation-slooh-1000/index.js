import { Box } from 'app/modules/missions/components/box';
import { Slooh1000Setup } from 'app/modules/missions/components/slooh-1000-setup';
import React, { Component } from 'react';
import { AvailbleMissionTile } from '../available-mission-tile';
import { ExpireCountdown } from '../expire-countdown';
import { ExplanationModal } from '../explanation-modal';
import { MissionSuccessModal } from '../mission-success-modal';
import './styles.scss';

export class ReservationSlooh1000 extends Component {
  state = {
    successModalShow: false,
  };

  componentDidMount() {
    const { getCategoryList, resetMissionsData } = this.props;
    resetMissionsData();
    getCategoryList();
  }

  componentWillUnmount() {
    this.cancelMissionSlot();
  }

  getMissionSlot = () => {
    const { getMissionSlot, selectedObjectData } = this.props;

    getMissionSlot({
      callSource: 'byTelescope',
      domeId: selectedObjectData.domeId,
      missionStart: selectedObjectData.missionStart,
      objectId: selectedObjectData.objectId,
      objectTitle: selectedObjectData.objectTitle,
      objectType: selectedObjectData.objectType,
      obsId: selectedObjectData.obsId,
      scheduledMissionId: selectedObjectData.scheduledMissionId,
      telescopeId: selectedObjectData.telescopeId,
    }).then(() => this.grabedMissionTile.scrollIntoView());
  };

  reserveMissionSlot = () => {
    const { reserveMissionSlot, missionSlot } = this.props;

    reserveMissionSlot({
      callSource: 'byTelescope',
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

  modalClose = () => {
    const { resetMissionsData } = this.props;
    this.setState({ successModalShow: false }, () => resetMissionsData());
  };

  cancelMissionSlot = () => {
    const { cancelMissionSlot, missionSlot } = this.props;

    if (missionSlot && missionSlot.scheduledMissionId) {
      cancelMissionSlot({
        callSource: 'byTelescope',
        grabType: 'notarget',
        scheduledMissionId: missionSlot.scheduledMissionId,
      });
    }
  };

  setCategory = value => {
    const { setCategory, getObjectList, categoryList } = this.props;
    const { typeName, nameFrom, nameTo } = categoryList[value];
    setCategory(value);
    getObjectList({
      typeName,
      nameFrom,
      nameTo,
      includeDescription: true,
      callSource: 'byTelescope',
    });
  };

  render() {
    const {
      categoryList,
      categoryListOpts,
      setCategory,
      objectListOpts,
      setObject,
      missionSlot,
      selectedCategorySlug,
      selectedObjectId,
      reservedMissionData,
      reservedMission,
      resetMissionsData,
      objectListExpires,
    } = this.props;

    const { successModalShow } = this.state;

    return (
      <div className="slooh-1000">
                <Slooh1000Setup
                  categoryList={categoryList}
                  categoryListOpts={categoryListOpts}
                  objectListOpts={objectListOpts}
                  setCategory={this.setCategory}
                  setObject={setObject}
                  getMissionSlot={this.getMissionSlot}
                  selectedCategorySlug={selectedCategorySlug}
                  selectedObjectId={selectedObjectId}
                  disabled={missionSlot && missionSlot.missionAvailable}
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

        <ExpireCountdown
          expireTimestamp={objectListExpires}
          onComplete={resetMissionsData}
        />
      </div>
    );
  }
}
