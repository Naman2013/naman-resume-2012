import React, { Component, PropTypes } from 'react';

import Timer from './common/timer';
import FormSectionTitle from './common/form-section-title';

class ReservationByObjects extends Component {
  render() {
    return(
      <div className="reservation-form-container">

        <Timer />

        <div className="col-xs-4">
          <FormSectionTitle
            text="Select Category"
            number="1"
          />
        </div>

        <div className="col-xs-4">
          <FormSectionTitle
            text="Choose a specific object"
            number="2"
          />
        </div>

        <div className="col-xs-4">
          <FormSectionTitle
            text="Object summary"
            number="3"
          />
        </div>

      </div>
    );
  }
}

export default ReservationByObjects;
