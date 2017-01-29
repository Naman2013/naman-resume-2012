/**
  ~ determining which visibility call to make ~
  the optional props
  missionStart
  obsId
  domeId
  If these are visible, we know the specific telescope the user is trying
  to reserve, so we use checkTargetVisibility

  Otherwise, we use the more work intensive checkCatalogVisibility
  that attempts to try to fill in the missing information

  Additionally, scheduleMissionId gets a little complex coming into making
  a reservation.  When the component is provided a scheduledMissionId as a prop
  it will use that instead of the data provided from checkTargetVisibility - as
  the API assumes that the client already knows what scheduleMissionId it is interested in.

  When a scheduledMissionId is NOT provided, it will assume that the call to
  checkCatalogVisibility is made, and the scheduledMissionId is stored
  there within the components internal state.
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import _ from 'lodash';
import ReservationSelectList from '../../components/common/forms/reservation-select-list';
import EnterDesignationForm from '../../components/reserve/enter-designation-form';
import { fetchCatalog } from '../../modules/catalog/get-catalog-actions';
import { checkTargetVisibility, checkCatalogVisibility } from '../../modules/check-target-visibility/api';
import { fetchPresetOptions } from '../../modules/get-preset-options/get-preset-options-actions';
import { placeOneHourHold } from '../../modules/grab-telescope-slot/actions';
import styles from '../../components/reserve/reserve-by-object.scss';

import { grabMissionSlot, missionConfirmOpen } from '../../modules/Missions';

const ImageProcessingHelperText = ({ content }) => (
  <div>
    <p className="sub-text">
      {content}
    </p>
  </div>
);

const mapStateToProps = ({ catalog, user }) => ({
  ...catalog,
  user: user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    fetchCatalog,
    grabMissionSlot,
    missionConfirmOpen,
    placeOneHourHold,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ReserveByCatalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibilityValid: false,
      presetOptions: null,

      selectedCatalogIndex: undefined,
      designation: '',
      checkVisibilityEnabled: false,
      visibilityStatus: {},

      selectedImageProcessingIndex: undefined,
    };

    this.handleVisibilityCheck = this.handleVisibilityCheck.bind(this);
    this.handleCatalogSelect = this.handleCatalogSelect.bind(this);
    this.handleSelectImageProcessing = this.handleSelectImageProcessing.bind(this);
    this.handleDesignationChange = this.handleDesignationChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePlaceHourHold = this.handlePlaceHourHold.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchCatalog();
    this.fetchImageProcessing();
  }

  handleCatalogSelect(event) {
    this.setState({
      selectedCatalogIndex: event.target.value,
      designation: '',
      checkVisibilityEnabled: false,
      presetOptions: null,
      visibilityStatus: {},
    });
  }

  handleSelectImageProcessing(event) {
    this.setState({
      selectedImageProcessingIndex: event.target.value,
    });
  }

  handleDesignationChange(event) {
    const checkVisibilityEnabled = !!event.target.value.trim();
    this.setState({
      designation: event.target.value,
      checkVisibilityEnabled,
    });
  }

  fetchImageProcessing(telescopeId) {
    const normalizedTelescopeIdSource = this.props.telescopeId || telescopeId;
    if(normalizedTelescopeIdSource) {
      fetchPresetOptions({
        telescopeId: normalizedTelescopeIdSource,
      })
      .then(result => {
        this.setState({
          presetOptions: result.data,
        });
      });
    }
  }

  get selectedImageProcessing() {
    const { presetOptions, selectedImageProcessingIndex } = this.state;
    const hasSelectedImageProcessing = selectedImageProcessingIndex;
    if(hasSelectedImageProcessing) {
      return presetOptions.telescopeList[0].telePresetList[selectedImageProcessingIndex];
    }

    return {};
  }

  get imageProcessingList() {
    const { presetOptions } = this.state;
    if(_.has(presetOptions, 'telescopeList')) {
      return presetOptions.telescopeList[0].telePresetList.map(presetOption => presetOption.presetDisplayName);
    }
    return [];
  }

  get selectedCatalog() {
    const { selectedCatalogIndex } = this.state;
    const { catalog } = this.props;
    return catalog.catalogList[selectedCatalogIndex];
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const { uniqueId, callSource } = this.props;
    const { visibilityStatus, designation } = this.state;
    const { objectDec, objectRA } = visibilityStatus;

    // determining from which source to read these parameters
    const scheduledMissionId = visibilityStatus.scheduledMissionId || this.props.scheduledMissionId;
    const missionStart = visibilityStatus.missionStart || this.props.missionStart;
    const telescopeId = visibilityStatus.telescopeId || this.props.telescopeId;
    const obsId = visibilityStatus.obsId || this.props.obsId;
    const domeId = visibilityStatus.domeId || this.props.domeId;

    const selectedCatalog = this.selectedCatalog;
    const selectedImageFormat = this.selectedImageProcessing;

    this.props.actions.grabMissionSlot({
      domeId,
      objectDec,
      objectRA,
      obsId,
      scheduledMissionId,
      telescopeId,
      missionStart,
      designation,
      uniqueId,
      processingRecipe: selectedImageFormat.presetOption,
      catalog: selectedCatalog.catalog,
      catName: selectedCatalog.catName,
      callSource,
      missionType: 'catalog',
    });

    this.props.actions.missionConfirmOpen('reserve');
  }

  // TODO: continue to build out and use normalizeMissionInfo instead of running the || guard checks in other places
  normalizedMissionInfo() {
    const scheduledMissionId = this.props.scheduledMissionId || this.state.visibilityStatus.scheduledMissionId;
    const uniqueId = this.props.uniqueId || this.state.visibilityStatus.uniqueId;
    return {
      scheduledMissionId,
      uniqueId,
    };
  };

  handlePlaceHourHold(event) {
    event.preventDefault();
    const { scheduledMissionId, uniqueId } = this.normalizedMissionInfo();
    this.props.actions.placeOneHourHold({
      scheduledMissionId,
      uniqueId,
    });
  }

  renderStepThree() {
    const { presetOptions, selectedImageProcessingIndex } = this.state;
    const { showPlaceOnHold, showCancelHold } = this.props;

    const hasSelectedImageProcessing = !!selectedImageProcessingIndex;

    const scheduleMissionButtonClasses = classnames('btn-primary', {
      disabled: !hasSelectedImageProcessing,
    });

    return (
      <div>
        <ReservationSelectList
          options={this.imageProcessingList}
          name="imageProcessing"
          selectedIndex={selectedImageProcessingIndex}
          handleSelectChange={this.handleSelectImageProcessing}
          listHeight={170}
        />

        <ImageProcessingHelperText content={this.selectedImageProcessing.presetHelpText} />

        <section className="actions-container">
          {
            showPlaceOnHold ?
            <button
              onClick={this.handlePlaceHourHold}
              className="btn-primary">Hold One Hour</button> : null
          }
          {
            showCancelHold ?
            <button className="btn-primary">Cancel Hold</button> : null
          }
          <button
            type="submit"
            className={scheduleMissionButtonClasses}>
              Schedule Mission
          </button>
        </section>
      </div>
    );
  }

  handleVisibilityCheck(event) {
    event.preventDefault();
    const { checkVisibilityEnabled, selectedCatalogIndex, designation } = this.state;
    const { user, catalog, domeId, obsId, missionStart } = this.props;
    const { cid, at, token } = user;

    if(checkVisibilityEnabled) {
      const currentCatalog = catalog.catalogList[selectedCatalogIndex];

      if(domeId && obsId && missionStart) {
        checkTargetVisibility({
          cid,
          at,
          token,
          missionStart,
          obsId,
          domeId,
          designation,
          catalog: currentCatalog.catalog,
          catName: currentCatalog.catName,
          missionType: 'catalog',
        })
        .then(result => {
          this.handleVisibilityResult(result.data);
          this.fetchImageProcessing(result.data.telescopeId);
        });
      } else {
        checkCatalogVisibility({
          cid,
          at,
          token,
          designation,
          catalog: currentCatalog.catalog,
          catName: currentCatalog.catName,
        })
        .then(result => {
          this.handleVisibilityResult(result.data);
          this.fetchImageProcessing(result.data.telescopeId);
        });
      }
    }
  }

  handleVisibilityResult(visibilityStatus) {
    this.setState({
      visibilityStatus,
    });
  }

  render() {
    const { catalog } = this.props;
    const {
      selectedCatalogIndex,
      designation,
      checkVisibilityEnabled,
      visibilityStatus } = this.state;

    // showStepTwo when we detect a catalog has been selected
    const showStepTwo = !!selectedCatalogIndex;
    const showStepThree = visibilityStatus.objectIsVisible;

    let catalogList = [];
    let selectedCatalog = undefined;
    if(_.has(catalog, 'catalogList')) {
      catalogList = catalog.catalogList.map(catalogItem => (
        <span><img src={catalogItem.catIconURL} /> {catalogItem.catFullName}</span>
      ));

      selectedCatalog = catalog.catalogList[selectedCatalogIndex];
    }

    return (
      <div className={styles.reserveObjectPage}>
        <form
          onSubmit={this.handleFormSubmit}
          onChange={this.handleFormChange}>

          <div className="row">
            <div className="col-md-4">
              <h2><span className="number">1</span> Select Catalog</h2>
              <ReservationSelectList
                options={catalogList}
                selectedIndex={selectedCatalogIndex}
                handleSelectChange={this.handleCatalogSelect}
                name="catalog"
              />
            </div>

            <div className="col-md-4">
              <h2><span className="number">2</span> Enter Designation</h2>
              {
                showStepTwo ?
                  <EnterDesignationForm
                    exampleFormat={selectedCatalog.catFormat}
                    example={selectedCatalog.catExample}
                    designation={designation}
                    designationChangeCallback={this.handleDesignationChange}
                    checkVisibilityEnabled={checkVisibilityEnabled}
                    handleVisibilityCheck={this.handleVisibilityCheck}
                    visibilityStatusExplanation={visibilityStatus.explanation}
                  /> : null
              }
            </div>

            <div className="col-md-4">
              <h2><span className="number">3</span> Select Image Processing</h2>
              {
                showStepThree ?
                  this.renderStepThree() : null
              }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

ReserveByCatalog.defaultProps = {
  showPlaceOnHold: false,
  showCancelHold: false,
};

ReserveByCatalog.defaultProps = {
  callSource: 'byCatalog',
};

const { string, number, bool } = PropTypes;
ReserveByCatalog.propTypes = {
  showPlaceOnHold: bool,
  showCancelHold: bool,
  missionStart: number,
  telescopeId: string,
  obsId: string,
  domeId: number,
  uniqueId: string,
  scheduledMissionId: number,
  callSource: string.isRequired,
};

export default ReserveByCatalog;
