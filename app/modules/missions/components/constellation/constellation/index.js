import { Box } from 'app/modules/missions/components/box';
import React, { Component } from 'react';
import { AvailbleMissionTile } from '../../available-mission-tile';
import { ConstellationSetup } from '../constellation-setup';
import { ExpireCountdown } from '../../expire-countdown';
import { ExplanationModal } from '../../explanation-modal';
import { MissionSuccessModal } from '../../mission-success-modal';
import './styles.scss';

export class Constellation extends Component {
  state = {
    successModalShow: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevState.successModalShow !== this.state.successModalShow || prevProps.missionSlot !== this.missionSlot)
      window.scrollTo(0,0);
  }

  componentDidMount() {
    const { getConstellationList } = this.props;
    getConstellationList({ callSource: 'byConstellationV4' });
  }

  componentWillUnmount() {
    this.cancelMissionSlot();
  }

  getMissionSlot = () => {
    const { getMissionSlot } = this.props;

    getMissionSlot(
      {
        callSource: 'byConstellationV4',
      },
      () => this.grabedMissionTile.scrollIntoView()
    );
  };

  reserveMissionSlot = () => {
    const { reserveMissionSlot } = this.props;

    reserveMissionSlot(
      {
        callSource: 'byConstellationV4',
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
      cancelMissionSlot({
        callSource: 'byConstellationV4',
      });
    }
  };

  setConstellation = value => {
    const { setConstellation } = this.props;
    setConstellation(value, {
      callSource: 'byConstellationV4',
    });
  };

  render() {
    const {
      constellationListOpt,
      setConstellation,
      objectListOpts,
      setObject,
      missionSlot,
      selectedConstellation,
      selectedObjectId,
      reservedMissionData,
      resetMissionsData,
      objectListExpires,
      availableMissions,
      noObjects,
      reservedMission,
      pageSetup,
    } = this.props;
    const { yourMissionPrompt, cancelButtonCaption, scheduleMissionCaption, choosePrompt, completeReservationPromptShort, navigationConfig, } = pageSetup;

    const { successModalShow } = this.state;
    return (
      <div className="constellation">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Box>
                <ConstellationSetup
                  constellationListOpt={constellationListOpt}
                  objectListOpts={objectListOpts}
                  setConstellation={this.setConstellation}
                  setObject={setObject}
                  getMissionSlot={this.getMissionSlot}
                  selectedConstellation={selectedConstellation}
                  selectedObjectId={selectedObjectId}
                  disabled={missionSlot && missionSlot.missionAvailable}
                  availableMissions={availableMissions}
                  noObjects={noObjects}
                  choosePrompt={choosePrompt}
                  pageConfig={navigationConfig[1]}
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
                    completeReservationPromptShort={completeReservationPromptShort}
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
