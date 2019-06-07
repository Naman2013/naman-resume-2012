import { Box } from 'app/modules/missions/components/box';
import moment from 'moment';
import Countdown from 'react-countdown-now';
import React, { Component } from 'react';

export function withCoordinates(WrappedComponent) {
  return class extends Component {
    checkCatalogVisibility = designation => {
      const { checkCatalogVisibility, selectedCatalogData } = this.props;
      const { catName, catalog } = selectedCatalogData;
      checkCatalogVisibility({ catName, catalog, designation });
    };

    checkTargetVisibility = (ra, dec) => {
      const {
        checkTargetVisibility,
        selectedCatalogData,
        selectedSlot,
        selectedTelescope,
      } = this.props;
      const { domeId, obsId, telescopeId } = selectedTelescope;
      const { missionStart } = selectedSlot;

      return checkTargetVisibility(
        {
          domeId,
          missionStart,
          obsId,
          ra,
          dec,
          missionType: 'coord',
        },
        telescopeId
      );
    };

    getMissionSlot = (data, callback) => {
      const {
        getMissionSlot,
        targetName,
        objectData,
        processingRecipe,
        selectedSlot,
        selectedTelescope,
        categoryList,
        selectedCategorySlug,
      } = this.props;
      const { objectDec, objectRA } = objectData;
      const { domeId, obsId, telescopeId } = selectedTelescope;
      const { missionStart, scheduledMissionId } = selectedSlot;

      getMissionSlot({
        targetName,
        domeId,
        missionStart,
        objectType: categoryList[selectedCategorySlug].typeName,
        objectDec,
        objectRA,
        obsId,
        processingRecipe: processingRecipe.presetOption,
        scheduledMissionId,
        telescopeId,
        ...data,
      }).then(callback);
    };

    grabUpdatedSlot = (requestData, callback) => {
      const {
        grabUpdatedSlot,
        scrollToGrabbedMission,
        selectedTelescope,
        selectedSlot,
        categoryList,
        selectedCategorySlug,
        targetName,
        coordinatesData,
        processingRecipe,
      } = this.props;
      const { domeId, obsId, telescopeId } = selectedTelescope;
      const { missionStart, scheduledMissionId, uniqueId } = selectedSlot;

      this.checkTargetVisibility(coordinatesData.ra, coordinatesData.dec).then(
        ({ data }) => {
          if (data.objectIsVisible) {
            grabUpdatedSlot({
              targetName,
              domeId,
              missionStart,
              objectType: categoryList[selectedCategorySlug].typeName,
              objectDec: coordinatesData.dec,
              objectRA: coordinatesData.ra,
              obsId,
              processingRecipe: processingRecipe.presetOption,
              scheduledMissionId,
              telescopeId,
              uniqueId,
              ...requestData,
            }).then(callback);
          }
        }
      );
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
          checkTargetVisibility={this.checkTargetVisibility}
          cancelMissionSlot={this.cancelMissionSlot}
          reserveMissionSlot={this.reserveMissionSlot}
          getMissionSlot={this.getMissionSlot}
          grabUpdatedSlot={this.grabUpdatedSlot}
        />
      );
    }
  };
}
