import React, { Component, PropTypes } from 'react';
import ReservationSelectList from '../../../common/forms/reservation-select-list';
import Timer from './common/timer';
import style from './reservation-by-coordinate.scss';

const imageProcessingOptions = [
  'Generic',
  'Bright Star',
  'Open Cluster',
  'Globular Cluster',
  'Bright Galaxy or Comet',
  'Generic',
  'Bright Star',
  'Open Cluster',
  'Globular Cluster',
  'Bright Galaxy or Comet'
];

class ReservationByCoordinate extends Component {
  render() {
    const { showPlaceOnHold, showCancelHold } = this.props;
    return(
      <div className="reservation-form-container">
        <div className="reserveObjectPage reserve-by-coordinate two-up">
          <Timer />

          <div className="row">
            <div className="col-xs-6">
              <h2>
                <span className="number">1</span>
                Enter Coordinates <br />
                <span className="sub-text">(J2000.0)</span>
              </h2>

              <div className="form-row-container">
                <div className="form-row">RA: <input className="generic-text-input" type="text" /> <span className="symbol-character">h</span></div>
                <div className="form-row"><input className="generic-text-input" type="text" /> <span className="symbol-character">m</span></div>
                <div className="form-row"><input className="generic-text-input" type="text" /> <span className="symbol-character">s</span></div>
              </div>

              <div className="form-row-container">
                <div className="form-row">Dec: <input className="generic-text-input" type="text" /> <span className="symbol-character">d</span></div>
                <div className="form-row"><input className="generic-text-input" type="text" /> <span className="symbol-character">m</span></div>
                <div className="form-row"><input className="generic-text-input" type="text" /> <span className="symbol-character">s</span></div>
              </div>

              <div className="form-row-container highlighted">
                <div className="form-row">RA: <input className="generic-text-input" type="text" /></div>
                <div className="form-row">Dec: <input className="generic-text-input" type="text" /></div>
              </div>
            </div>

            <div className="col-xs-6">
              <h2><span className="number">2</span> Select Image Processing</h2>
                <ReservationSelectList
                  ref="imageProcessing"
                  options={imageProcessingOptions}
                  name="imageProcessing"
                  listHeight={170}
                />
              <p className="sub-text">Your captures will be saved to the <br /> My Pictures area of the Telescopes menu.</p>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <section className="actions-container">
                {
                  showPlaceOnHold ?
                  <button className="btn-primary">Hold One Hour</button> : null
                }
                {
                  showCancelHold ?
                  <button className="btn-primary">Cancel Hold</button> : null
                }
                <button className="btn-primary">Schedule Mission</button>
              </section>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

ReservationByCoordinate.defaultProps = {
  showPlaceOnHold: false,
  showCancelHold: false,
};

const { string, number, bool } = PropTypes;
ReservationByCoordinate.propTypes = {
  showPlaceOnHold: bool,
  showCancelHold: bool,
};

export default ReservationByCoordinate;
