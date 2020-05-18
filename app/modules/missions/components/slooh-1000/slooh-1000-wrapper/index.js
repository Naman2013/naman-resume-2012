import { Box } from 'app/modules/missions/components/box';
import moment from 'moment';
import Countdown from 'react-countdown-now';
import React, { Component } from 'react';

export function withSlooh1000(WrappedComponent) {
  return class extends Component {
    getCategoryList = ({ callSource }) => {
      const { getCategoryList } = this.props;
      getCategoryList({ callSource });
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
        slotType: selectedObjectData.slotType,
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
        slotType: missionSlot.slotType,
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

    setCategory = (value, data) => {
      const { setCategory, getObjectList, categoryList } = this.props;
      const { typeName, nameFrom, nameTo } = categoryList[value];

      setCategory(value);
      getObjectList({
        typeName,
        nameFrom,
        nameTo,
        includeDescription: true,
        ...data,
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          getCategoryList={this.getCategoryList}
          setCategory={this.setCategory}
          cancelMissionSlot={this.cancelMissionSlot}
          reserveMissionSlot={this.reserveMissionSlot}
          getMissionSlot={this.getMissionSlot}
        />
      );
    }
  };
}
