/**
  determining which visibility call to make
  the optional props
  missionStart
  obsId
  domeId
  If these are visible, we know the specific telescope the user is trying
  to reserve, so we use checkTargetVisibility

  Otherwise, we use the more work intensive checkCatalogVisibility
  that attempts to try to fill in the missing information
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import _ from 'lodash';
import ReservationSelectList from '../../components/common/forms/reservation-select-list';
import EnterDesignationForm from '../../components/reserve/enter-designation-form';
import { fetchCatalog } from '../../modules/catalog/get-catalog-actions';
import { checkTargetVisibility } from '../../modules/check-target-visibility/api';
import { fetchPresetOptions } from '../../modules/get-preset-options/get-preset-options-actions';
import styles from '../../components/reserve/reserve-by-object.scss';

const ImageProcessingHelperText = () => (
  <div>
    <p className="sub-text">
      Your captures will be saved to the <br /> My Pictures area of the Telescopes menu.
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
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ReserveByCatalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibilityValid: false,
      presetOptions: null,
      showImageProcessingHelpText: false,

      selectedCatalogIndex: undefined,
      designation: '',
      checkVisibilityEnabled: false,
      visibilityStatus: {},
    };

    this.handleVisibilityCheck = this.handleVisibilityCheck.bind(this);
    this.handleCatalogSelect = this.handleCatalogSelect.bind(this);
    this.handleDesignationChange = this.handleDesignationChange.bind(this);
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

  handleFormSubmit(event) {
    event.preventDefault();
    console.log('form submitted');
  }

  renderStepThree() {
    const { presetOptions, showImageProcessingHelpText, scheduleMissionEnabled } = this.state;
    const { showPlaceOnHold, showCancelHold } = this.props;

    const scheduleMissionButtonClasses = classnames('btn-primary', {
      'disabled': !scheduleMissionEnabled,
    });

    let imageOptions = [];
    if(_.has(presetOptions, 'telescopeList')) {
      imageOptions = presetOptions.telescopeList[0].telePresetList.map(presetOption => presetOption.presetDisplayName);
    }

    return(
      <div>
        <ReservationSelectList
          ref="imageProcessing"
          options={imageOptions}
          name="imageProcessing"
          listHeight={170}
        />

        {
          showImageProcessingHelpText ?
            <ImageProcessingHelperText /> : null
        }

        <section className="actions-container">
          {
            showPlaceOnHold ?
            <button className="btn-primary">Hold One Hour</button> : null
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
      .then(result => this.handleVisibilityResult(result.data));
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
        <span><img src={catalogItem.catIconURL} height="15" /> {catalogItem.catFullName}</span>
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

const { string, number, bool } = PropTypes;
ReserveByCatalog.propTypes = {
  showPlaceOnHold: bool,
  showCancelHold: bool,
  missionStart: number,
  telescopeId: string,
  obsId: string,
  domeId: number,
};

export default ReserveByCatalog;
