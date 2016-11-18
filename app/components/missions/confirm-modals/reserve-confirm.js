import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../mission-modals.scss';

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

    // TODO: finish the timer
    // TODO: add in the telescope reservation info
    // TODO: tie in the object icon
    // TODO: tie in the object name
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
            <p>Thursday, October 18th &middot; 10:05pm EST &middot; 7:05pm PST &middot; 3:05 UTC</p>
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
