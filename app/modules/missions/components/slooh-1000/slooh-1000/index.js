import { Box } from 'app/modules/missions/components/box';
import React, { Component } from 'react';
import { AvailbleMissionTile } from '../../available-mission-tile';
import { ExpireCountdown } from '../../expire-countdown';
import { ExplanationModal } from '../../explanation-modal';
import { MissionSuccessModal } from '../../mission-success-modal';
import { Slooh1000Setup } from '../slooh-1000-setup';
import './styles.scss';

export class Slooh1000 extends Component {
  state = {
    successModalShow: false,
  };

  componentDidMount() {
    const { getCategoryList, resetMissionsData } = this.props;
    resetMissionsData();
    getCategoryList({ callSource: 'bySlooh1000V4' });
  }

  componentWillUnmount() {
    this.cancelMissionSlot();
  }

  getMissionSlot = () => {
    const { getMissionSlot } = this.props;

    getMissionSlot(
      {
        callSource: 'bySlooh1000V4',
      },
      () => this.grabedMissionTile.scrollIntoView()
    );
  };

  reserveMissionSlot = () => {
    const { reserveMissionSlot } = this.props;

    reserveMissionSlot(
      {
        callSource: 'bySlooh1000V4',
      },
      () => this.setState({ successModalShow: true })
    );
  };

  modalClose = () => {
    const { resetMissionsData } = this.props;
    this.setState({ successModalShow: false }, () => resetMissionsData());
  };

  cancelMissionSlot = () => {
    const { cancelMissionSlot } = this.props;
    const { successModalShow } = this.state;

    if (!successModalShow) {
      cancelMissionSlot({ callSource: 'bySlooh1000V4' });
    }
  };

  setCategory = value => {
    const { setCategory } = this.props;
    setCategory(value, {
      callSource: 'bySlooh1000V4',
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
      resetMissionsData,
      objectListExpires,
      reservedMission,
      availableMissions,
      noObjects,
    } = this.props;

    const { successModalShow } = this.state;

    return (
      <div className="slooh-1000">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Box>
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
                  availableMissions={availableMissions}
                  noObjects={noObjects}
                  description="Welcome to the Slooh 1000! Tell us what you want to see, we’ll tell
                  you which scope to use, and the best time to see it!"
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
