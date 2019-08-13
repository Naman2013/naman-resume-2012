import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './styles.scss';

export class WriteObservationStep2 extends Component {
  render() {
    const {
      imageData,
      goBack,
      onHide,
      setTitle,
      setText,
      onSubmit,
      objectDetails,
    } = this.props;
    const { imageURL, observationLog } = imageData;
    const { objectIconURL } = objectDetails;
    console.log(imageData);
    return (
      <div className="write-observation-step2">
        <h1 className="modal-h">Add an Observation!</h1>
        <div className="selected-image">
          <div className="selected-image-details">
            <div>
              <h3>Image Selected!</h3>
              <p>
                {observationLog
                  ? `Your image is set. Now, share your Observation below.`
                  : `
                Your image is set. Now, write your Observation below, and add it
                to Slooh to finish up!`}
              </p>
            </div>
            <div>
              <Button onClick={goBack}>Go back</Button>
            </div>
          </div>

          <div className="selected-image-container">
            {imageURL ? (
              <img src={imageURL} alt="" />
            ) : (
              <div className="image-background">
                <div className="object-icon-container">
                  <img src={objectIconURL} alt="" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="observation-form">
          <input
            placeholder="Title your Observation"
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write your Observation"
            onChange={e => setText(e.target.value)}
          />
          <div className="observation-form-actions">
            <Button onClick={onHide}>Cancel</Button>
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    );
  }
}
