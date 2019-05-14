import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './styles.scss';

export class WriteObservationStep2 extends Component {
  render() {
    const { imageData, goBack } = this.props;
    const { imageURL } = imageData;
    console.log(imageData);
    return (
      <div className="write-observation-step2">
        <h1 className="modal-h">Add an Observation!</h1>
        <div className="selected-image">
          <div className="selected-image-details">
            <div>
              <h3>Image Selected!</h3>
              <p>
                Your image is set. Now, write your Observation below, and add it
                to Slooh to finish up!
              </p>
            </div>
            <div>
              <Button onClick={goBack}>Go back</Button>
            </div>
          </div>

          <div className="selected-image-container">
            <img src={imageURL} alt="" />
          </div>
        </div>
      </div>
    );
  }
}
