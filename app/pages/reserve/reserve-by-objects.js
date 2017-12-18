import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import flatten from 'lodash/flatten';
import uniqueId from 'lodash/uniqueId';
import { validateResponseAccess } from '../../modules/authorization/actions';
import ReservationSelectList from '../../components/common/forms/reservation-select-list';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import styles from '../../components/reserve/reserve-by-object.scss';

import fetchCatagoryList, {
  fetchPopularObjectList,
} from '../../modules/browse-popular-objects/api';
import { grabMissionSlot, missionConfirmOpen } from '../../modules/Missions';

import { resetBrowseByPopularObjects } from '../../modules/browse-popular-objects/actions';
import { placeOneHourHold } from '../../modules/grab-telescope-slot/actions';

const { number, string, shape } = PropTypes;

const mapStateToProps = ({ user, popularObjects }) => ({
  user,
  popularObjects,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      grabMissionSlot,
      missionConfirmOpen,
      resetBrowseByPopularObjects,
      validateResponseAccess,
      placeOneHourHold,
    },
    dispatch,
  ),
});

const Catagory = ({ text, imageURL }) => (
  <span>
    {imageURL ? <img alt={`Icon representing ${text}`} src={imageURL} /> : null} {text}
  </span>
);

Catagory.defaultProps = {
  imageURL: '',
};

Catagory.propTypes = {
  imageURL: string,
  text: string.isRequired,
};

const defaultCatagoryList = {
  categoryList: [],
};

const defaultObjectsList = {
  categoryList: [],
};

@connect(mapStateToProps, mapDispatchToProps)
class ReserveObjects extends Component {
  constructor(props) {
    super(props);

    this.handleCatagorySelectChange = this.handleCatagorySelectChange.bind(this);
    this.handleObjectSelectChange = this.handleObjectSelectChange.bind(this);
    this.handleClearBrowse = this.handleClearBrowse.bind(this);
    this.handleScheduleMission = this.handleScheduleMission.bind(this);
  }

  state = {
    catagoryList: defaultCatagoryList,
    objects: defaultObjectsList,
    fetchingObjectList: false,
    selectedCategoryIndex: null,
    selectedObjectIndex: null,
  };

  componentWillMount() {
    const { callSource } = this.props;
    const { at, cid, token } = this.props.user;

    fetchCatagoryList({
      at,
      cid,
      token,
      callSource,
    }).then((result) => {
      this.props.actions.validateResponseAccess(result.data);
      if (!result.data.apiError) {
        this.setCatagoryList(result.data);
      }
    });
  }

  setCatagoryList(catagoryList) {
    this.setState({
      catagoryList,
    });
  }

  getSelectedCategory(selectedIndex) {
    const { catagoryList } = this.state;
    return catagoryList.categoryList[selectedIndex];
  }

  setObjects(objects) {
    const objectResponse = (objects && objects.data) || defaultObjectsList;

    this.setState({
      objects: objectResponse,
      fetchingObjectList: false,
    });
  }

  // TODO: continue to build out and use normalizeMissionInfo instead of running the || guard checks in other places
  normalizedMissionInfo() {
    const scheduledMissionId =
      this.props.scheduledMissionId || this.state.visibilityStatus.scheduledMissionId;
    const uniqueId = this.props.uniqueId || this.state.visibilityStatus.uniqueId;
    return {
      scheduledMissionId,
      uniqueId,
    };
  }

  handleCatagorySelectChange(event) {
    const {
      callSource,
      uniqueId,
      scheduledMissionId,
      missionStart,
      obsId,
      domeId,
      telescopeId,
    } = this.props;

    const { at, cid, token } = this.props.user;
    const { categorySlug } = this.getSelectedCategory(event.target.value);

    if (this.fetchPopularObjectListPromise) {
      this.fetchPopularObjectListPromise.cancelToken.cancel('canceled request...');
    }

    this.fetchPopularObjectListPromise = fetchPopularObjectList({
      at,
      cid,
      token,
      categorySlug,
      callSource,
      uniqueId,
      scheduledMissionId,
      missionStart,
      obsId,
      domeId,
      telescopeId,
      includeDescription: true,
    });
    this.fetchPopularObjectListPromise.promise.then((result) => {
      if (result) {
        this.setObjects(result);
      }
    });

    this.setState({
      objects: defaultObjectsList,
      fetchingObjectList: true,
      selectedCategoryIndex: event.target.value,
      selectedObjectIndex: null,
    });
  }

  handleObjectSelectChange(event) {
    this.setState({
      selectedObjectIndex: event.target.value,
    });
  }

  handleClearBrowse(event) {
    event.preventDefault();
    this.setState({
      objects: defaultObjectsList,
      selectedCategoryIndex: null,
      selectedObjectIndex: null,
    });
  }

  handlePlaceHourHold = (event) => {
    event.preventDefault();
    const { scheduledMissionId, uniqueId } = this.normalizedMissionInfo();
    this.props.actions.placeOneHourHold({
      scheduledMissionId,
      uniqueId,
    });
  };

  handleScheduleMission(event) {
    event.preventDefault();

    const { callSource, uniqueId } = this.props;
    const {
      missionStart,
      scheduledMissionId,
      obsId,
      domeId,
      telescopeId,
      objectId,
      objectType,
      objectTitle,
    } = this.currentObjectSelection;

    const missionType = callSource === 'byTelescope' ? 'member' : undefined;

    this.props.actions.grabMissionSlot({
      scheduledMissionId,
      callSource,
      missionType,
      missionStart,
      obsId,
      domeId,
      telescopeId,
      objectId,
      objectType,
      objectTitle,
      uniqueId,
    });

    this.props.actions.missionConfirmOpen('reserve');

    /* reset the browse */
    this.handleClearBrowse(event);
  }

  get mappedObjects() {
    const { objects } = this.state;
    return flatten(
      objects.categoryList.map(category =>
        category.categoryTopicList.map((object) => {
          if (object.topicIsSubcategory) {
            return {
              title: object.objectTitle,
            };
          }

          return Object.assign(
            {},
            {
              option: <Catagory text={object.topicName} />,
              enabled: object.topicIsEnabled,
            },
            object,
          );
        }),
      ),
    );
  }

  get currentObjectSelection() {
    const { selectedObjectIndex } = this.state;
    return this.mappedObjects[selectedObjectIndex];
  }

  renderStepTwo() {
    const { fetchingObjectList } = this.state;
    const { selectedCategoryIndex, selectedObjectIndex } = this.state;

    if (fetchingObjectList) {
      return <GenericLoadingBox text="Calculating best time and telescope..." />;
    }

    if (!fetchingObjectList && selectedCategoryIndex) {
      return (
        <ReservationSelectList
          selectedIndex={selectedObjectIndex}
          handleSelectChange={this.handleObjectSelectChange}
          options={this.mappedObjects}
          name={`object-${uniqueId()}`}
        />
      );
    }

    return null;
  }

  render() {
    const { showMakeReservation, showPlaceOnHold, showCancelHold, resetForm } = this.props;
    const { catagoryList, selectedCategoryIndex } = this.state;

    const catagories = catagoryList.categoryList.map(catagory => (
      <Catagory text={catagory.categoryDisplayName} imageURL={catagory.categoryIconURL} />
    ));

    const currentObjectSelection = this.currentObjectSelection;

    return (
      <div className={styles.reserveObjectPage}>
        <div className="row">
          <div className="col-md-4">
            <h2>
              <span className="number">1</span> Select Category
            </h2>
            <h3 className="sub-title">
              Start by choosing either the type of object you want to see or the constellation where
              it is situated, and we will show you a list of objects that are visible this time of
              year.
            </h3>
            <ReservationSelectList
              selectedIndex={selectedCategoryIndex}
              handleSelectChange={this.handleCatagorySelectChange}
              options={catagories}
              name={`category-${uniqueId()}`}
            />
          </div>

          <div className="col-md-4">
            <h2>
              <span className="number">2</span> Choose Specific Object
            </h2>
            <h3 className="sub-title">
              Select the object you want to see, and we’ll pick the time and best telescope for you
              to schedule the mission.
            </h3>
            {this.renderStepTwo()}
          </div>

          <div className="col-md-4">
            <h2>
              <span className="number">3</span> Object Summary
            </h2>
            <div className={styles.objectSummary}>
              {currentObjectSelection ? (
                <div>
                  <span className="title">{currentObjectSelection.topicDisplayName}</span>
                  <p>{currentObjectSelection.topicDescription}</p>
                </div>
              ) : null}

              <section className="actions-container">
                {currentObjectSelection && showCancelHold ? (
                  <button className="btn-primary" onClick={handleCancelHold}>
                    Cancel Hold
                  </button>
                ) : null}
                {showPlaceOnHold ? (
                  <button className="btn-primary" onClick={this.handlePlaceHourHold}>
                    Hold One Hour
                  </button>
                ) : null}
                {currentObjectSelection && resetForm ? (
                  <button className="btn-primary" onClick={this.handleClearBrowse}>
                    Reset Browse
                  </button>
                ) : null}
                {currentObjectSelection && showMakeReservation ? (
                  <button className="btn-primary" onClick={this.handleScheduleMission}>
                    Schedule Mission
                  </button>
                ) : null}
              </section>
            </div>
          </div>
        </div>

        <style jsx>{`
          .sub-title {
            font-size: 12px;
            line-height: 20px;
            padding-left: 24px;
            margin-bottom: 10px;
          }
        `}</style>
      </div>
    );
  }
}

ReserveObjects.defaultProps = {
  selectedCategoryIndex: null,
  selectedObjectIndex: null,
  resetForm: true,
  showMakeReservation: true,
  placeOnHold: false,
  cancelHold: false,
  callSource: 'byPopularObjects',
  user: {
    cid: '',
    at: 0,
    token: '',
  },
  uniqueId: undefined,
  scheduledMissionId: undefined,
  missionStart: undefined,
  obsId: undefined,
  domeId: undefined,
  telescopeId: undefined,
};

ReserveObjects.propTypes = {
  selectedCategoryIndex: PropTypes.string,
  selectedObjectIndex: PropTypes.string,
  user: shape({
    cid: string.isRequired,
    at: number.isRequired,
    token: string.isRequired,
  }),
  callSource: string,
  resetForm: PropTypes.bool.isRequired,
  showMakeReservation: PropTypes.bool.isRequired,
  showPlaceOnHold: PropTypes.bool.isRequired,
  showCancelHold: PropTypes.bool.isRequired,
  uniqueId: string,
  scheduledMissionId: number,
  missionStart: number,
  obsId: string,
  domeId: number,
  telescopeId: string,
};

export default ReserveObjects;
