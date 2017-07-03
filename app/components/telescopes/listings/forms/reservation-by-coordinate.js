/**
  NOTES:
  underscores used in some naming to improve legability

  Calculation inspiration:
  http://www.rapidtables.com/convert/number/degrees-to-degrees-minutes-seconds.htm

  Example calculation of Decimal to Degrees:
  -18° 13' 52" = -18.23111
  90 59 59 =

  52 seconds/60 = 0.86666667 minutes

  13 minutes + 0.86666667 minutes = 13.86666667 minutes

  13.86666667 minutes/60 = 0.23111 degrees

  18 degrees + 0.23111 degrees = 18.23111 degrees

  Make result negative OR:

  -18 degrees -0.23111 degrees = -18.23111 degrees
  */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReservationSelectList from '../../../common/forms/reservation-select-list';
import TargetValidationForm from '../../../reserve/target-validation-form';
import Timer from './common/timer';
import './reservation-by-coordinate.scss';
import { fetchPresetOptions } from '../../../../modules/get-preset-options/get-preset-options-actions';
import { checkTargetVisibility } from '../../../../modules/check-target-visibility/api';
import { grabMissionSlot, grabUpdateMissionSlot, missionConfirmOpen } from '../../../../modules/Missions';

function round(number, precision) {
  const factor = window.Math.pow(10, precision);
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

function cleanTimeInput(timeValue) {
  const MAX_TIME = 59;
  const absoluteValue = window.Math.abs(timeValue);
  return (absoluteValue > MAX_TIME) ? MAX_TIME : absoluteValue;
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    grabMissionSlot,
    grabUpdateMissionSlot,
    missionConfirmOpen,
  }, dispatch),
});

// TODO: move this into a utility file
function cleanCalcInput(value) {
  let cleanedInput = value || 0;
  cleanedInput = (isNaN(cleanedInput)) ? 0 : cleanedInput;
  return parseFloat(cleanedInput);
}

/**
  @validNonCalculatedField
  Though not all allowed values are calculated, we store a short list of
  valid values that we will set to an input field

  If the user leaves the field without entering a valid number, the cleanInput
  methods will set up values that can be calculated
*/
function validNonCalculatedField(value, { allowNegativeValues }) {
  const VALID_NON_CALC_VALUES = [''];
  if (allowNegativeValues) {
    VALID_NON_CALC_VALUES.push('-');
  }
  return VALID_NON_CALC_VALUES.indexOf(value) > -1;
}

function numberOnly(value) {
  return value.replace(/[^0-9-]/g, '');
}

@connect(mapStateToProps, mapDispatchToProps)
class ReservationByCoordinate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImageProcessIndex: undefined,
      presetOptions: null,

      visibilityStatus: {},
      targetName: this.props.targetName,

      ra_h: 0,
      ra_m: 0,
      ra_s: 0,
      ra: this.props.objectRA,

      dec_d: 90,
      dec_m: 0,
      dec_s: 0,
      dec: this.props.objectDec,
    };

    this.handleDecSChange = this.handleDecSChange.bind(this);

    this.handleDECChange = this.handleDECChange.bind(this);
    this.handleVisibilityCheck = this.handleVisibilityCheck.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handleSelectImageTypeChange = this.handleSelectImageTypeChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.handleRAChange({ target: { value: this.state.ra } });
    this.handleDECChange({ target: { value: this.state.dec } });
  }

  // RA change events...
  handleRaHChange = (event) => {
    const newRAH = numberOnly(event.target.value);
    if (!newRAH) {
      this.setState({
        ra_h: newRAH,
      });
      return;
    }

    this.calculateFields({
      ra_h: cleanCalcInput(newRAH),
    });
  }

  handleRaHBlur = (event) => {
    this.calculateFields({
      ra_h: cleanCalcInput(event.target.value),
    });
  }

  handleRaSChange = (event) => {
    const ras = numberOnly(event.target.value);
    if (!ras) {
      this.setState({
        ra_s: ras,
      });

      return;
    }

    this.calculateFields({
      ra_s: cleanCalcInput(ras),
    });
  }

  handleRaSBlur = (event) => {
    this.calculateFields({
      ra_s: cleanCalcInput(event.target.value),
    });
  }

  updateRA = (ra) => {
    this.setState({
      ra,
    });
  }

  recalculateRA(newRAValue) {
    let ra = cleanCalcInput(newRAValue);
    let { ra_h, ra_m, ra_s } = this.state;

    if (ra >= 24) {
      ra_h = 0;
      ra_m = 0;
      ra_s = 0;
      ra = 0.0;
    }

    ra_h = Math.trunc(ra);
    ra_m = Math.trunc((ra - ra_h) * 60);
    ra_s = Math.round((((ra - ra_h) * 60) - ra_m) * 60);

    if (ra_s == 60) {
      ra_s = 0;
      ra_m = ra_m++;

      if (ra_m == 60) {
        ra_m = 0;
        ra_h = ra_h++;

        if (ra_h == 24) {
          ra_h = 0;
          ra = 0.0;
        }
      }
    }

    this.setState({
      ra_h,
      ra_m,
      ra_s,
      ra,
      visibilityStatus: {},
    });
  }

  handleRAChange = (event) => {
    const newRA = event.target.value;
    if (!newRA) {
      this.updateRA(newRA);
      return;
    }

    this.recalculateRA(newRA);
  }

  handleRABlur = (event) => {
    this.recalculateRA(event.target.value);
  }

  // ========================
  // TODO: refactor all inputs to use this method instead of their own unique methods
  // ========================
  handleFieldChange({ field, value, allowNegativeValues }) {
    const numberValue = numberOnly(value);
    if (validNonCalculatedField(numberValue, { allowNegativeValues })) {
      this.setState({
        [field]: numberValue,
      });
    } else {
      this.calculateFields({
        [field]: cleanCalcInput(numberValue),
      });
    }
  }

  handleFieldBlur({ field, value }) {
    this.calculateFields({
      [field]: cleanCalcInput(value),
    });
  }

  handleDecSChange(event) {
    const decS = numberOnly(event.target.value);
    if (!decS) {
      this.setState({
        dec_s: decS,
      });

      return;
    }

    this.calculateFields({
      dec_s: cleanCalcInput(decS),
    });
  }

  handleDecSBlur = (event) => {
    this.calculateFields({
      dec_s: cleanCalcInput(event.target.value),
    });
  }

  updateDEC(dec) {
    this.setState({
      dec,
    });
  }

  recalculateDEC(newDec) {
    let dec = cleanCalcInput(newDec);
    let { dec_d, dec_m, dec_s } = this.state;

    const minutesDivisor = 60;
    const secondsDivisor = 3600;

    if (dec >= 90) {
      dec_d = 90;
      dec_m = 0;
      dec_s = 0;
      dec = 90;
    }

    if (dec <= -90) {
      dec_d = -90;
      dec_m = 0;
      dec_s = 0;
      dec = -90;
    }

    const degrees = Math.trunc(dec);
    const minutes = Math.trunc((dec - degrees) * minutesDivisor);
    const seconds = Math.trunc((dec - degrees - (minutes / minutesDivisor)) * secondsDivisor);

    this.setState({
      dec,
      dec_d: degrees,
      dec_m: Math.abs(minutes),
      dec_s: Math.abs(seconds),
      visibilityStatus: {},
    });
  }

  /**
    two separate methods of setting the Decrementation
    first, if we are not dealing with a valid event object, then simply
    set the value.  This is here for when setting values from the server

    secondly, if we have a valid event object we will take the value
    and recalculate the degrees, minutes and seconds
    */
  handleDECChange(event) {
    const newDEC = event.target.value;
    if (!newDEC) {
      this.updateDEC(newDEC);
      return;
    }

    this.recalculateDEC(newDEC);
  }

  handleDECBlur = (event) => {
    this.recalculateDEC(event.target.value);
  }

  calculateFields(values) {
    const MAX_TIME = 59;

    let { dec, dec_d, dec_m, dec_s, ra_h, ra_m, ra_s } = Object.assign({}, this.state, values);
    let ra;

    // if dec_d is negative, make all numbers negative
    const minutesToHoursDivisor = (dec_d >= 0) ? 60 : -60;
    const secondsToHoursDivisor = (dec_d >= 0) ? 3600 : -3600;

    // set the appropriate ranges for minutes and seconds
    dec_s = cleanTimeInput(dec_s);
    dec_m = cleanTimeInput(dec_m);
    ra_m = cleanTimeInput(ra_m);
    ra_s = cleanTimeInput(ra_s);

    // calculate the dec value from the minutes and seconds provided
    const secondsToHours = (dec_s / secondsToHoursDivisor);
    const minutesToHours = (dec_m / minutesToHoursDivisor);
    dec = round((dec_d + secondsToHours + minutesToHours), 6);

    ra = round(ra_h + (ra_m / 60) + (ra_s / 3600), 6);

    if (dec >= 90) {
      dec = 90.0;
      dec_d = 90;
      dec_m = 0;
      dec_s = 0;
    }

    if (dec <= -90) {
      dec = -90.0;
      dec_d = -90;
      dec_m = 0;
      dec_s = 0;
    }

    if (ra >= 24) {
      ra = 0.0;
      ra_h = 0;
      ra_m = 0;
      ra_s = 0;
    }

    this.setState({
      dec_d,
      dec_m,
      dec_s,
      dec,
      ra_h,
      ra_m,
      ra_s,
      ra,
      visibilityStatus: {},
    });
  }

  handleVisibilityCheck(event) {
    event.preventDefault();
    const { dec, ra } = this.state;
    const { obsId, domeId, missionStart, telescopeId } = this.props;
    const { cid, at, token } = this.props.user;
    const missionType = 'coord';

    checkTargetVisibility({
      cid,
      at,
      token,
      dec,
      ra,
      missionType,
      obsId,
      domeId,
      missionStart,
      telescopeId,
    }).then((result) => {
      this.handleVisibilityResult(result.data);
      this.fetchImageOptions(result.data.objectIsVisible);
    });
  }

  fetchImageOptions(objectIsVisible) {
    if (objectIsVisible) {
      const { telescopeId } = this.props;
      fetchPresetOptions({
        telescopeId,
      }).then(result => this.handleImageOptions(result.data));
    }
  }

  handleImageOptions(presetOptions) {
    this.setState({
      presetOptions,
    });
  }

  handleVisibilityResult(visibilityStatus) {
    this.setState({
      visibilityStatus,
    });
  }

  handleTargetChange(event) {
    this.setState({
      targetName: event.target.value,
    });
  }

  handleSelectImageTypeChange(event) {
    this.setState({
      selectedImageProcessIndex: event.target.value,
    });
  }

  renderStepThree() {
    const { showPlaceOnHold, showCancelHold, userHasReservation } = this.props;
    const { visibilityStatus, presetOptions, selectedImageProcessIndex } = this.state;
    const scheduleMissionButtonClasses = classnames('btn-primary', {
      disabled: !!selectedImageProcessIndex ? false : true,
    });
    let presetOptionsText = [];
    if (presetOptions) {
      presetOptionsText = presetOptions.telescopeList[0].telePresetList.map(presetOption => presetOption.presetDisplayName);
    }

    return (
      <div>
        {
          visibilityStatus.objectIsVisible ?
            <div>
              <ReservationSelectList
                options={presetOptionsText}
                selectedIndex={selectedImageProcessIndex}
                handleSelectChange={this.handleSelectImageTypeChange}
                name="imageProcessing"
                listHeight={170}
              />

              <p className="sub-text">Your captures will be saved to the <br /> My Pictures area of the Telescopes menu.</p>
            </div> : null
        }
        <div className="col-xs-12">
          <section className="actions-container">
            {
              showPlaceOnHold ?
                <button className="btn-primary">Hold One Hour</button> : null
            }
            {
              visibilityStatus.objectIsVisible && showCancelHold ?
                <button className="btn-primary">Cancel Hold</button> : null
            }
            {
              userHasReservation ?
                <button className={scheduleMissionButtonClasses}>Update Mission</button> : null
            }
            {
              visibilityStatus.objectIsVisible && !userHasReservation ?
                <button className={scheduleMissionButtonClasses}>Schedule Mission</button> : null
            }
          </section>
        </div>
      </div>
    );
  }

  resetRAFields() {
    this.setState({
      ra_h: 0,
      ra_m: 0,
      ra_s: 0,
      ra: 0.0,
    });
  }

  calculateRAField({ ra_h, ra_m, ra_s }) {
    const calculatedRA = round(ra_h + (ra_m / 60) + (ra_s / 3600), 6);
    if (calculatedRA > 24) {
      this.resetRAFields();
    }

    return calculatedRA;
  }


  handleFormSubmit(event) {
    event.preventDefault();
    const {
      obsId,
      domeId,
      telescopeId,
      missionStart,
      uniqueId,
      scheduledMissionId,
      userHasReservation,
    } = this.props;

    const {
      ra,
      dec,
      selectedImageProcessIndex,
      presetOptions,
      targetName
    } = this.state;

    if (selectedImageProcessIndex) {
      const selectedImageProcess = presetOptions.telescopeList[0].telePresetList[selectedImageProcessIndex];
      const missionPayload = {
        callSource: 'byTelescope',
        missionType: 'coord',
        scheduledMissionId,
        objectRA: ra,
        objectDec: dec,
        processingRecipe: selectedImageProcess.presetOption,
        targetName,
        missionStart,
        obsId,
        domeId,
        telescopeId,
        uniqueId,
      };

      if (userHasReservation) {
        this.props.actions.grabUpdateMissionSlot(missionPayload);
      } else {
        this.props.actions.grabMissionSlot(missionPayload);
      }

      this.props.actions.missionConfirmOpen('reserve');
    }
  }

  render() {
    const { expires, expireCallback } = this.props;
    const {
      ra_h,
      ra_m,
      ra_s,
      ra,
      dec_d,
      dec_m,
      dec_s,
      dec,
      targetName,
      visibilityStatus,
    } = this.state;

    return (
      <div className="reservation-form-container">
        <form onSubmit={this.handleFormSubmit} method="POST" noValidate>

          <div className="reserveObjectPage reserve-by-coordinate">
            <Timer startTime={expires} expireCallback={expireCallback} />
            <div className="row">
              <div className="col-xs-4">
                <h2>
                  <span className="number">1</span>
                  Enter Coordinates <br />
                  <span className="sub-text">(J2000.0)</span>
                </h2>

                <div className="form-row-container">
                  <div className="form-row">RA: <input type="text" value={ra_h} onChange={(event) => { this.handleFieldChange({ field: 'ra_h', value: event.target.value }); }} onBlur={(event) => { this.handleFieldBlur({ field: 'ra_h', value: event.target.value }); }} className="generic-text-input" /> <span className="symbol-character">h</span></div>
                  <div className="form-row"><input type="text" value={ra_m} onChange={(event) => { this.handleFieldChange({ field: 'ra_m', value: event.target.value, allowNegativeValues: false }); }} onBlur={(event) => { this.handleFieldBlur({ field: 'ra_m', value: event.target.value }); }} className="generic-text-input" /> <span className="symbol-character">m</span></div>
                  <div className="form-row"><input type="text" value={ra_s} onChange={this.handleRaSChange} onBlur={this.handleRaSBlur} className="generic-text-input" /> <span className="symbol-character">s</span></div>
                </div>

                <div className="form-row-container">
                  <div className="form-row">Dec: <input type="text" value={dec_d} onChange={(event) => { this.handleFieldChange({ field: 'dec_d', value: event.target.value, allowNegativeValues: true }); }} onBlur={(event) => { this.handleFieldBlur({ field: 'dec_d', value: event.target.value }); }} className="generic-text-input" /> <span className="symbol-character">d</span></div>
                  <div className="form-row"><input type="text" value={dec_m} onChange={(event) => { this.handleFieldChange({ field: 'dec_m', value: event.target.value }); }} onBlur={(event) => { this.handleFieldBlur({ field: 'dec_m', value: event.target.value }); }} className="generic-text-input" /> <span className="symbol-character">m</span></div>
                  <div className="form-row"><input type="text" value={dec_s} onChange={this.handleDecSChange} onBlur={this.handleDecSBlur} className="generic-text-input" /> <span className="symbol-character">s</span></div>
                </div>

                <div className="form-row-container highlighted">
                  <div className="form-row">RA: <input value={ra} onChange={this.handleRAChange} onBlur={this.handleRABlur} size="8" className="generic-text-input" type="number" /></div>
                  <div className="form-row">Dec: <input value={dec} onChange={this.handleDECChange} onBlur={this.handleDECBlur} size="8" className="generic-text-input" type="number" /></div>
                </div>
              </div>

              <div className="col-xs-4">
                <h2>
                  <span className="number">2</span>
                  Check Target
                </h2>

                <TargetValidationForm
                  checkVisibilityEnabled={true}
                  targetName={targetName}
                  handleTargetChange={this.handleTargetChange}
                  handleVisibilityCheck={this.handleVisibilityCheck}
                  visibilityStatusExplanation={visibilityStatus.explanation}
                />
              </div>

              <div className="col-xs-4">
                <h2>
                  <span className="number">3</span> Select Image Processing
                </h2>

                {
                  this.renderStepThree()
                }

              </div>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

ReservationByCoordinate.defaultProps = {
  showPlaceOnHold: false,
  showCancelHold: false,
  objectRA: 0.0,
  objectDec: 90.0,
  targetName: '',
  userHasReservation: false,
};

const { string, number, bool, func } = PropTypes;
ReservationByCoordinate.propTypes = {
  showPlaceOnHold: bool,
  showCancelHold: bool,
  expires: number.isRequired,
  expireCallback: func.isRequired,
  missionStart: number.isRequired,
  obsId: string.isRequired,
  domeId: number.isRequired,
  telescopeId: string.isRequired,
  uniqueId: string.isRequired,
  scheduledMissionId: number.isRequired,
  objectRA: PropTypes.oneOfType([number, string]),
  objectDec: PropTypes.oneOfType([number, string]),
  userHasReservation: bool,
  targetName: string,
};

export default ReservationByCoordinate;
