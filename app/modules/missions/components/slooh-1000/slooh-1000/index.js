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

  componentDidUpdate(prevProps, prevState) {
    if(prevState.successModalShow !== this.state.successModalShow || prevProps.missionSlot !== this.missionSlot)
      window.scrollTo(0,0);
  }

  componentDidMount() {
    const { getCategoryList, resetMissionsData, fetchMissionQuota } = this.props;
    resetMissionsData();
    getCategoryList({ callSource: 'bySlooh1000V4' });
    fetchMissionQuota();
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
      pageSetup,
      missionQuota,
    } = this.props;
    const { successModalShow } = this.state;
    const {
      yourMissionPrompt,
      cancelButtonCaption,
      scheduleMissionCaption,
      choosePrompt,
      completeReservationPromptShort,
      navigationConfig,
    } = pageSetup;

    return (
      <div className="slooh-1000">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
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
                  choosePrompt={choosePrompt}
                  pageConfig={navigationConfig[0]}
                  missionQuota={missionQuota}
                />
              </Box>
            </div>
            <div
              className="col-lg-12 reserved-mission"
              ref={node => (this.grabedMissionTile = node)}
            >
              <Box inside>
                {missionSlot && missionSlot.missionAvailable ? (
                  <AvailbleMissionTile
                    missionSlot={missionSlot}
                    onCancel={this.cancelMissionSlot}
                    onSubmit={this.reserveMissionSlot}
                    cancelButtonCaption={cancelButtonCaption}
                    scheduleMissionCaption={scheduleMissionCaption}
                    completeReservationPromptShort={
                      completeReservationPromptShort
                    }
                  />
                ) : (
                  <div className="reserved-mission-gag">
                    {yourMissionPrompt}
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
