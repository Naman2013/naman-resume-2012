import { Box } from 'app/modules/missions/components/box';
import moment from 'moment';
import Countdown from 'react-countdown-now';
import React, { Component } from 'react';

export function withCatalog(WrappedComponent) {
  return class extends Component {
    getCatalogList = ({ callSource }) => {
      const { getCatalogList } = this.props;
      getCatalogList({ callSource });
    };

    checkCatalogVisibility = designation => {
      const { checkCatalogVisibility, selectedCatalogData } = this.props;
      const { catName, catalog } = selectedCatalogData;
      checkCatalogVisibility({ catName, catalog, designation });
    };

    checkTargetVisibility = designation => {
      const {
        checkTargetVisibility,
        selectedCatalogData,
        selectedSlot,
        selectedTelescope,
      } = this.props;
      const { catName, catalog } = selectedCatalogData;
      const { domeId, obsId, telescopeId } = selectedTelescope;
      const { missionStart } = selectedSlot;

      checkTargetVisibility(
        {
          catName,
          catalog,
          designation,
          domeId,
          missionStart,
          obsId,
          missionType: 'catalog',
        },
        telescopeId
      );
    };

    getMissionSlot = (data, callback) => {
      const {
        getMissionSlot,
        selectedCatalogData,
        designation,
        objectData,
        processingRecipe,
        selectedSlot,
        selectedTelescope,
        byTelescope,
      } = this.props;
      const { catName, catalog } = selectedCatalogData;
      const { objectDec, objectRA } = objectData;

      getMissionSlot({
        catName,
        catalog,
        designation,
        domeId: objectData.domeId || selectedTelescope.domeId,
        missionStart: objectData.missionStart || selectedSlot.missionStart,
        objectDec,
        objectRA,
        obsId: objectData.obsId || selectedTelescope.obsId,
        processingRecipe: processingRecipe.presetOption,
        scheduledMissionId:
          objectData.scheduledMissionId || selectedSlot.scheduledMissionId,
        telescopeId: objectData.telescopeId || selectedTelescope.telescopeId,
        ...data,
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

    render() {
      return (
        <WrappedComponent
          {...this.props}
          getCatalogList={this.getCatalogList}
          checkCatalogVisibility={this.checkCatalogVisibility}
          checkTargetVisibility={this.checkTargetVisibility}
          cancelMissionSlot={this.cancelMissionSlot}
          reserveMissionSlot={this.reserveMissionSlot}
          getMissionSlot={this.getMissionSlot}
        />
      );
    }
  };
}
