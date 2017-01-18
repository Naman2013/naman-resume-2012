import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { flatten } from 'lodash';
import ReserveObjectsSummary from '../../components/reserve/reserve-by-object-summary';
import ReservationSelectList from '../../components/common/forms/reservation-select-list';
import styles from '../../components/reserve/reserve-by-object.scss';

import fetchCatagoryList, { fetchPopularObjectList } from '../../modules/browse-popular-objects/api';
import { grabMissionSlot, missionConfirmOpen } from '../../modules/Missions';


const { number, string, shape } = PropTypes;

const mapStateToProps = ({ user, popularObjects }) => ({
  user,
  popularObjects,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    grabMissionSlot,
    missionConfirmOpen,
  }, dispatch),
});

const Catagory = ({ text, imageURL }) => (
  <span>
    {imageURL ? <img height="15" alt={`Icon representing ${text}`} src={imageURL} /> : null} {text}
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

const defaultFormState = {
  selectedCatagoryIndex: undefined,
  catagoryList: defaultCatagoryList,

  selectedObjectIndex: undefined,
  objects: defaultObjectsList,
};

@connect(mapStateToProps, mapDispatchToProps)
class ReserveObjects extends Component {
  constructor(props) {
    super(props);

    this.state = defaultFormState;

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
    }).then(result => this.setCatagoryList(result.data));
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
    this.setState({
      objects,
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

    fetchPopularObjectList({
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
    }).then(result => this.setObjects(result.data));

    this.setState({
      selectedCatagoryIndex: event.target.value,
      selectedObjectIndex: undefined,
      objects: defaultObjectsList,
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
      selectedCatagoryIndex: undefined,
      selectedObjectIndex: undefined,
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
    const { selectedObjectIndex } = this.state;
    return this.mappedObjects[selectedObjectIndex];
  }

  render() {
    const { selectedCatagoryIndex, catagoryList, selectedObjectIndex } = this.state;
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
              selectedIndex={selectedCatagoryIndex}
              handleSelectChange={this.handleCatagorySelectChange}
              options={catagories}
              name="catagory"
            />
          </div>

          <div className="col-md-4">
            <h2><span className="number">2</span> Choose Specific Object</h2>
            <ReservationSelectList
              selectedIndex={selectedObjectIndex}
              handleSelectChange={this.handleObjectSelectChange}
              options={this.mappedObjects}
              name="object"
            />
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
  scheduledMissionId: string,
  missionStart: number,
  obsId: string,
  domeId: string,
  telescopeId: string,
};

export default ReserveObjects;
