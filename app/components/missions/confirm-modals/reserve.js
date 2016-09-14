import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import styles from '../mission-modals.scss';

const ReserveConfirm = (props) => {
  let handleDelete = () => {
      console.log('del');
  }

  let handleAddition = () => {
    console.log('add');
  }

  let handleDrag = () => {
    console.log('drag');
  }

  let tags = [
    {id: 1, text: "galaxy"},
    {id: 2, text: "andromeda"},
    {id: 3, text: "canary islands"},
    {id: 4, text: "m31"},
    {id: 5, text: "deep space"}
   ];
  let suggestions = ["mars", "jupiter", "moon", "saturn"];

  return (
    <Modal show={props.mission.isConfirmationOpen} className="missionModal reserveMissionModal">
      <div className="title-bar">
        <h3>Please complete your reservation form within 04:47</h3>
      </div>
      <Modal.Header>
        <h1>You’re reserving the Canary Islands 1 Telescope to see:</h1>
        <img className={styles.cardIcon} src="../../../assets/icons/Jupiter.svg" />
        <h2>Andromeda Galaxy (M31)</h2>
      </Modal.Header>

      <Modal.Body>
        <div className="mission-schedule">
          <h4>Mission Details:</h4>
          <p>Thursday, October 18th 10:05pm EST, 7:05pm PST, 3:05 UTC</p>
        </div>

        <div className="share-objectives">
          <h4>SHARE YOUR MISSION OBJECTIVES:</h4>
          <textarea placeholder="It’s optional, but would you consider succinctly describing your thoughts on the mission? Anything goes, tweet style."></textarea>
        </div>

        <div className="mission-tags">
          <h4>MISSION TAGS:</h4>
          <a href="#">Add a tag</a>
        </div>

        <div className="mission-image-options">
          <h4>MISSION TAGS:</h4>
            <ReactTags tags={tags}
                suggestions={suggestions}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag} />
          <a href="#">Add a tag</a>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button className="btn-primary" onClick={props.closeModal}>Sorry, Cancel this.</Button>
        <Button className="btn-primary" onClick={props.closeModal}>Absolutely!</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ReserveConfirm;
