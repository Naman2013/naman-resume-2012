import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import './styles.scss';

export class WriteObservationStep3 extends PureComponent {
  render() {
    const { onHide, shareMemberPhotoData } = this.props;
    const {
      pageHeading1,
      pageHeading2,
      confirmationPageLinkUrl,
    } = shareMemberPhotoData;

    return (
      <div className="write-observation-step3">
        <h1 className="modal-h">{pageHeading1}</h1>
        <p className="modal-p my-5">{pageHeading2}</p>
        <Button onClick={onHide} className="modal-btn">
          Close
        </Button>
        <Link to={confirmationPageLinkUrl}>
          <Button className="modal-btn">Go to observation</Button>
        </Link>
      </div>
    );
  }
}
