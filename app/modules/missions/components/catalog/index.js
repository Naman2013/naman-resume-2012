import { Box } from 'app/modules/missions/components/box';
import { Slooh1000Setup } from 'app/modules/missions/components/slooh-1000-setup';
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
    // const { getCategoryList, getBySlooh1000 } = this.props;
    // getCategoryList();
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
      <div className="catalog">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Box>fsadsafsa</Box>
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

        {/* <MissionSuccessModal
          show={successModalShow}
          onHide={this.modalClose}
          reservedMissionData={reservedMissionData}
        /> */}
      </div>
    );
  }
}
