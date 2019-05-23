import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import './styles.scss';

export class WriteObservationStep3 extends PureComponent {
  render() {
    const { onHide } = this.props;

    return (
      <div className="write-observation-step3">
        <h1 className="modal-h">Success! You’ve Added an Observation</h1>
        <p className="modal-p my-5">
          You’ve earned 20 Gravity points by sharing your voice with the Slooh
          Community! We’ll notify you about community activity on your
          Observation. Find this and all your Observations in your Profile’s
          Photo Hub section.
        </p>
        <Button onClick={onHide} className="modal-btn">
          Close
        </Button>
        <Button onClick={onHide} className="modal-btn">
          Go to observation
        </Button>
      </div>
    );
  }
}
