import { Box } from 'app/modules/missions/components/box';
import moment from 'moment';
import Countdown from 'react-countdown-now';
import React, { Component } from 'react';

export function withConstellation(WrappedComponent) {
  return class extends Component {
    getConstellationList = ({ callSource }) => {
      const { getConstellationList } = this.props;
      getConstellationList({ callSource });
    };

    getMissionSlot = (data, callback) => {
      const { getMissionSlot, selectedObjectData } = this.props;

      getMissionSlot({
        ...data,
        domeId: selectedObjectData.domeId,
        missionStart: selectedObjectData.missionStart,
        objectId: selectedObjectData.objectId,
        objectTitle: selectedObjectData.objectTitle,
        objectType: selectedObjectData.objectType,
        obsId: selectedObjectData.obsId,
        scheduledMissionId: selectedObjectData.scheduledMissionId,
        telescopeId: selectedObjectData.telescopeId,
      }).then(callback);
    };

    reserveMissionSlot = ({ callSource }, callback) => {
      const { reserveMissionSlot, missionSlot } = this.props;

      reserveMissionSlot({
        callSource,
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
      }).then(callback);
    };

    cancelMissionSlot = data => {
      const { cancelMissionSlot, missionSlot } = this.props;

      if (missionSlot && missionSlot.scheduledMissionId) {
        cancelMissionSlot({
          ...data,
          grabType: 'notarget',
          scheduledMissionId: missionSlot.scheduledMissionId,
        });
      }
    };

    setConstellation = (value, data) => {
      const { setConstellation } = this.props;

      setConstellation(value, data);
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          getConstellationList={this.getConstellationList}
          setConstellation={this.setConstellation}
          cancelMissionSlot={this.cancelMissionSlot}
          reserveMissionSlot={this.reserveMissionSlot}
          getMissionSlot={this.getMissionSlot}
        />
      );
    }
  };
}
