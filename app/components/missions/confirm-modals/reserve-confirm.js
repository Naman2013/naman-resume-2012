import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../mission-modals.scss';
import moment from 'moment-timezone';

function mapStateToProps({ missions }) {
  return {
    currentMissionSlot: missions.currentMissionSlot,
  };
}

@connect(mapStateToProps)
class ReserveConfirm extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
    this.handleChangeObject = this.handleChangeObject.bind(this)
  }

  componentWillMount() {
    this.setState({
      objective: '',
      tags: [
        {id: 1, text: "galaxy"},
        {id: 2, text: "andromeda"},
        {id: 3, text: "canary islands"},
        {id: 4, text: "m31"},
        {id: 5, text: "deep space"}
      ]
    });
  }

  handleChangeObject(event) {
    this.setState({ objective: event.target.value });
  }

  handleDelete(){
    console.log('del');
  }

  handleAddition(){
    console.log('add');
  }

  handleDrag(){
    console.log('drag');
  }

  onSubmit(){
    console.log(this.state);
  }

  render () {
    const suggestions = ['mars', 'jupiter', 'moon', 'saturn'];
    const {
      open,
      closeModal,
      currentMissionSlot,
    } = this.props;

    // validate whether or not we have a mission slot ready to render
    if(!currentMissionSlot) { return null }

    const missionData = currentMissionSlot.missionList[0];

    const EST_start = moment.tz(missionData.missionStart, 'America/New_York').format('dddd, MMMM Do');
    const EST_start_time = moment.tz(missionData.missionStart, 'America/New_York').format('h:mma z');
    const PST_start_time = moment.tz(missionData.missionStart, 'America/Los_Angeles').format('h:mma z');
    const UTC_start_time = moment(missionData.missionStart).format('HH:mm');


    // TODO: finish the timer
    // TODO: tie in the mission time and date
    // TODO: make the reservation
    // TODO: call cancel reservation when the use selects cancel?

    return (
      <Modal show={ open } className="missionModal reserveMissionModal">
        <div className="title-bar">
          <h3>Please complete your reservation form within 04:47</h3>
        </div>

        <Modal.Header>
          <h1 className="title-secondary">You’re reserving the { missionData.telescopeName } telescope to see:</h1>
          <img className={styles.cardIcon} src={ missionData.objectIconURL } />
          <h2 className="mission-title">{ missionData.title }</h2>
        </Modal.Header>

        <Modal.Body>
          <div className="mission-schedule">
            <h4>Mission Details:</h4>
            <p>{ EST_start } &middot; { EST_start_time } &middot; { PST_start_time } &middot; { UTC_start_time } UTC</p>
          </div>

          <div className="share-objectives">
            <h4>SHARE YOUR MISSION OBJECTIVES:</h4>
            <textarea className="mission-objectives" placeholder="It’s optional, but would you consider succinctly describing your thoughts on the mission? Anything goes, tweet style."
              value={ this.state.objective }
              onChange={ this.handleChangeObject }></textarea>
          </div>

          <div className="mission-tags">
            <h4 className="title">MISSION TAGS:</h4>
            <ReactTags tags={ this.state.tags }
              suggestions={ suggestions }
              handleDelete={ this.handleDelete }
              handleAddition={ this.handleAddition }
              handleDrag={ this.handleDrag } />
          </div>

        </Modal.Body>

        <Modal.Footer>
          <Button className="btn-primary" onClick={ closeModal }>Sorry, Cancel This.</Button>
          <Button className="btn-primary" onClick={ this.onSubmit }>Absolutely!</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

ReserveConfirm.propTypes = {};

export default ReserveConfirm;
