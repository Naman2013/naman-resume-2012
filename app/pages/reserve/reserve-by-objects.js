import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { flatten } from 'lodash';
import { validateResponseAccess } from '../../modules/authorization/actions';
import ReserveObjectsSummary from '../../components/reserve/reserve-by-object-summary';
import ReservationSelectList from '../../components/common/forms/reservation-select-list';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import styles from '../../components/reserve/reserve-by-object.scss';

import fetchCatagoryList, { fetchPopularObjectList } from '../../modules/browse-popular-objects/api';
import { grabMissionSlot, missionConfirmOpen } from '../../modules/Missions';
import { setCategoryIndex, setObjectIndex, resetBrowseByPopularObjects } from '../../modules/browse-popular-objects/actions';


const { number, string, shape } = PropTypes;

const mapStateToProps = ({ user, popularObjects, browseByPopularObjects }) => ({
  user,
  popularObjects,
  selectedCategoryIndex: browseByPopularObjects.selectedCategoryIndex,
  selectedObjectIndex: browseByPopularObjects.selectedObjectIndex,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    grabMissionSlot,
    missionConfirmOpen,
    setCategoryIndex,
    setObjectIndex,
    resetBrowseByPopularObjects,
    validateResponseAccess,
  }, dispatch),
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

    this.state = {
      catagoryList: defaultCatagoryList,
      objects: defaultObjectsList,
      fetchingObjectList: false,
    };

    this.handleCatagorySelectChange = this.handleCatagorySelectChange.bind(this);
    this.handleObjectSelectChange = this.handleObjectSelectChange.bind(this);
    this.handleClearBrowse = this.handleClearBrowse.bind(this);
    this.handleScheduleMission = this.handleScheduleMission.bind(this);
  }

  componentDidMount() {
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

    this.props.actions.setCategoryIndex(event.target.value);
    this.props.actions.setObjectIndex(null);

    this.setState({
      objects: defaultObjectsList,
      fetchingObjectList: true,
    });
  }

  handleObjectSelectChange(event) {
    this.props.actions.setObjectIndex(event.target.value);
  }

  handleClearBrowse(event) {
    event.preventDefault();
    this.props.actions.resetBrowseByPopularObjects();
    this.setState({
      objects: defaultObjectsList,
    });
  }

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

    const missionType = (callSource === 'byTelescope') ? 'member' : undefined;

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
  }

  get mappedObjects() {
    const { objects } = this.state;
    return flatten(objects.categoryList.map((category) => {
      return category.categoryTopicList.map((object) => {
        if (object.topicIsSubcategory) {
          return {
            title: object.objectTitle,
          };
        }

        return Object.assign({}, {
          option: <Catagory text={object.topicName} />,
          enabled: object.topicIsEnabled,
        }, object);
      });
    }));
  }

  get currentObjectSelection() {
    const { selectedObjectIndex } = this.props;
    return this.mappedObjects[selectedObjectIndex];
  }

  renderStepTwo() {
    const { fetchingObjectList } = this.state;
    const { selectedCategoryIndex, selectedObjectIndex } = this.props;

    if (fetchingObjectList) {
      return <GenericLoadingBox />;
    }

    if (!fetchingObjectList && selectedCategoryIndex) {
      return (
        <ReservationSelectList
          selectedIndex={selectedObjectIndex}
          handleSelectChange={this.handleObjectSelectChange}
          options={this.mappedObjects}
          name="object"
        />
      );
    }

    return null;
  }

  render() {
    const { catagoryList } = this.state;
    const { selectedCategoryIndex } = this.props;
    const catagories = catagoryList.categoryList.map(catagory =>
      <Catagory text={catagory.categoryDisplayName} imageURL={catagory.categoryIconURL} />,
    );

    const currentObjectSelection = this.currentObjectSelection;

    return (
      <div className={styles.reserveObjectPage}>
        <div className="row">

          <div className="col-md-4">
            <h2><span className="number">1</span> Select Category</h2>

            <ReservationSelectList
              selectedIndex={selectedCategoryIndex}
              handleSelectChange={this.handleCatagorySelectChange}
              options={catagories}
              name="catagory"
            />
          </div>

          <div className="col-md-4">
            <h2><span className="number">2</span> Choose Specific Object</h2>
            {
              this.renderStepTwo()
            }
          </div>

          <div className="col-md-4">
            <h2><span className="number">3</span> Object Summary</h2>
            {
              currentObjectSelection ?
                <ReserveObjectsSummary
                  objectTitle={currentObjectSelection.topicDisplayName}
                  objectSummary={currentObjectSelection.topicDescription}
                  handleClearBrowse={this.handleClearBrowse}
                  handleScheduleMission={this.handleScheduleMission}
                /> : null
            }
          </div>
        </div>
      </div>
    );
  }
}

ReserveObjects.defaultProps = {
  selectedCategoryIndex: null,
  selectedObjectIndex: null,
  resetForm: true,
  makeReservation: true,
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
  // resetForm: bool.isRequired,
  // showMakeReservation: bool.isRequired,
  // showPlaceOnHold: bool.isRequired,
  // showCancelHold: bool.isRequired,
  uniqueId: string,
  scheduledMissionId: number,
  missionStart: number,
  obsId: string,
  domeId: number,
  telescopeId: string,
};

export default ReserveObjects;
