import { Box } from 'app/modules/missions/components/box';
import { Slooh1000Setup } from 'app/modules/missions/components/slooh-1000-setup';
import React, { Component } from 'react';
import moment from 'moment';
import { AvailbleMissionTile } from '../available-mission-tile';
import { MissionSuccessModal } from '../mission-success-modal';
import './styles.scss';

export class Slooh1000 extends Component {
  state = {
    successModalShow: false,
  };

  componentDidMount = () => {
    const { getCategoryList, getBySlooh1000 } = this.props;
    //getBySlooh1000(); will be soon
    getCategoryList();
  };

  getMissionSlot = () => {
    const { getMissionSlot, selectedObjectData } = this.props;

    getMissionSlot({
      callSource: 'byPopularObjects',
      domeId: selectedObjectData.domeId,
      missionStart: selectedObjectData.missionStart,
      objectId: selectedObjectData.objectId,
      objectTitle: selectedObjectData.objectTitle,
      objectType: selectedObjectData.objectType,
      obsId: selectedObjectData.obsId,
      scheduledMissionId: selectedObjectData.scheduledMissionId,
      telescopeId: selectedObjectData.telescopeId,
    });
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

  getMissionDate = timestamp => moment.unix(timestamp).format('ddd. MMM. DD');

  getMissionTime = timestamp => moment.unix(timestamp).format('HH:mm');

  modalClose = () => {
    const { resetMissionsData } = this.props;
    this.setState({ successModalShow: false }, () => resetMissionsData());
  };

  render() {
    const {
      categoryListOpts,
      setCategory,
      objectListOpts,
      setObject,
      missionSlot,
      resetMissionsData,
      selectedCategorySlug,
      selectedObjectSlug,
      reservedMissionData,
    } = this.props;

    const { successModalShow } = this.state;
    
    return (
      <div className="slooh-1000">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Box>
                <Slooh1000Setup
                  categoryListOpts={categoryListOpts}
                  objectListOpts={objectListOpts}
                  setCategory={setCategory}
                  setObject={setObject}
                  getMissionSlot={this.getMissionSlot}
                  selectedCategorySlug={selectedCategorySlug}
                  selectedObjectSlug={selectedObjectSlug}
                />
              </Box>
            </div>
            <div className="col-lg-4 reserved-mission">
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
