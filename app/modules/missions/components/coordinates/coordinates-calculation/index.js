import React, { PureComponent } from 'react';
import trim from 'lodash/trim';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const MAX_SECONDS_CHARACTER_LENGTH = 4;
const MAX_TIME = 60;
const TIME_CEILING = 59;
const MAX_DECLINATION = 90;
const MIN_DECLINATION = -90;

function round(number, precision) {
  const factor = window.Math.pow(10, precision);
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

function cleanTimeInput(timeValue) {
  if (!timeValue) {
    return timeValue;
  }
  const absoluteValue = window.Math.abs(timeValue);
  return absoluteValue >= MAX_TIME ? TIME_CEILING : absoluteValue;
}

function cleanCalcInput(value) {
  let cleanedInput = value || 0;
  cleanedInput = isNaN(cleanedInput) ? 0 : cleanedInput;
  return parseFloat(cleanedInput);
}

function validNonCalculatedField(value, { allowNegativeValues }) {
  const VALID_NON_CALC_VALUES = [''];
  if (allowNegativeValues && value[0] === '-') {
    return true;
  }

  return VALID_NON_CALC_VALUES.indexOf(value) > -1;
}

function numberOnly(value) {
  return value.replace(/[^0-9-]/g, '');
}

function validFloat(value) {
  return /^\d+(\.)?\d{0,1}$/.test(value);
}

function removeMinusSign(value) {
  return String(value).replace(/[-]/g, '');
}

function isNegative(n) {
  return ((n = +n) || 1 / n) < 0;
}

export class CoordinatesCalculation extends PureComponent {
  componentDidMount() {
    const { setCoordinatesData, coordinatesData } = this.props;
    const newRA = this.recalculateRA(coordinatesData.ra);
    const newDEC = this.recalculateDEC(coordinatesData.dec);
    setCoordinatesData({
      ...coordinatesData,
      ...newRA,
      ...newDEC,
    });
  }

  recalculateRA = newRAValue => {
    let ra = cleanCalcInput(newRAValue);
    let ra_h = Math.trunc(ra);
    let ra_m = Math.trunc((ra - ra_h) * 60);
    let ra_s = round(((ra - ra_h) * 60 - ra_m) * 60, 1);

    if (ra_s >= MAX_TIME) {
      ra_s = 0;
      ra_m = ra_m += 1;

      if (ra_m >= MAX_TIME) {
        ra_m = 0;
        ra_h = ra_h += 1;

        if (ra_h >= 24) {
          ra_h = 0;
          ra = 0.0;
        }
      }
    }

    if (ra >= 24) {
      ra_h = 0;
      ra_m = 0;
      ra_s = 0;
      ra = 0.0;
    }

    return {
      ra_h,
      ra_m,
      ra_s,
      ra,
    }
  };

  setRA = newRAValue => {
    const { setCoordinatesData, coordinatesData } = this.props;
    const newRA = this.recalculateRA(newRAValue);
    setCoordinatesData({
      ...coordinatesData,
      ...newRA,
    });
  };

  handleRAChange = event => {
    const { setCoordinatesData, coordinatesData } = this.props;
    const newRA = removeMinusSign(event.target.value);
    if (!newRA) {
      setCoordinatesData({
        ...coordinatesData,
        ra: newRA,
      });
      return;
    }

    this.setRA(newRA);
  };

  handleFieldChange = ({ field, value, allowNegativeValues }) => {
    const { setCoordinatesData, coordinatesData } = this.props;
    const numberValue = numberOnly(value);
    if (validNonCalculatedField(numberValue, { allowNegativeValues })) {
      setCoordinatesData({
        ...coordinatesData,
        [field]: numberValue,
      });
    } else {
      this.calculateFields({
        [field]: cleanCalcInput(numberValue),
      });
    }
  };

  handleFieldBlur = ({ field, value, allowNegativeValues }) => {
    const { setCoordinatesData, coordinatesData } = this.props;
    this.calculateFields({
      [field]: cleanCalcInput(value),
    });
  };

  handleSecondsChange = ({ field, valueRAW }) => {
    const { setCoordinatesData, coordinatesData } = this.props;
    let value = trim(valueRAW);

    // if this is an empty string, set the field without running calculations
    // this is a UX feature to allow users to backspace all content
    if (value === '') {
      setCoordinatesData({
        ...coordinatesData,
        [field]: value,
      });
    }

    if (validFloat(value)) {
      value = value >= MAX_TIME ? TIME_CEILING : value;
      this.calculateFields({
        [field]: value,
      });
    }
  };

  handleSecondsBlur = ({ field, valueRAW }) => {
    this.calculateFields({
      [field]: cleanCalcInput(valueRAW),
    });
  };

  recalculateDEC = newDec => {
    let dec = cleanCalcInput(newDec);
    const minutesDivisor = 60;
    const secondsDivisor = 3600;

    let degrees = String.prototype.split.call(dec, '.')[0];
    let minutes = Math.trunc((dec - degrees) * minutesDivisor);
    let seconds = round(
      (dec - degrees - minutes / minutesDivisor) * secondsDivisor,
      1
    );

    minutes = Math.abs(minutes);
    seconds = Math.abs(seconds);

    if (seconds >= MAX_TIME) {
      seconds = 0;
      minutes += 1;

      if (minutes >= MAX_TIME) {
        minutes = 0;
        degrees += 1;
      }
    }

    if (degrees >= MAX_DECLINATION || dec >= MAX_DECLINATION) {
      degrees = MAX_DECLINATION;
      dec = MAX_DECLINATION;
      minutes = 0;
      seconds = 0;
    }

    if (degrees <= MIN_DECLINATION || dec <= MIN_DECLINATION) {
      degrees = MIN_DECLINATION;
      dec = MIN_DECLINATION;
      minutes = 0;
      seconds = 0;
    }

    if (newDec === "-0" && degrees == 0){
      degrees = "-0";
    }

    return {
      dec,
      dec_d: degrees,
      dec_m: minutes,
      dec_s: seconds,
    }
  };

  setDEC = newDec => {
    const { setCoordinatesData, coordinatesData } = this.props;
    const newDEC = this.recalculateDEC(newDec);

    setCoordinatesData({
      ...coordinatesData,
      ...newDEC,
    });
  };

  handleDECChange = event => {
    const { setCoordinatesData, coordinatesData } = this.props;
    const newDEC = event.target.value;
    if (!newDEC) {
      setCoordinatesData({
        ...coordinatesData,
        dec: newDEC,
      });
      return;
    }

    this.setDEC(newDEC);
  };

  calculateFields = values => {
    const { setCoordinatesData, coordinatesData } = this.props;
    let { dec, dec_d, dec_m, dec_s, ra_h, ra_m, ra_s } = Object.assign(
      {},
      coordinatesData,
      values
    );
    let ra;
    const tempDec_d = dec_d;
    // if dec_d is negative, make all numbers negative
    const minutesToHoursDivisor = dec_d >= 0 ? 60 : -60;
    const secondsToHoursDivisor = dec_d >= 0 ? 3600 : -3600;

    // perform value casting
    dec_d = parseInt(dec_d, 10);
    // set the appropriate ranges for minutes, seconds and hours
    dec_m = cleanTimeInput(dec_m);
    ra_h = cleanTimeInput(ra_h);
    ra_m = cleanTimeInput(ra_m);

    // calculate the dec value from the minutes and seconds provided
    const secondsToHours = dec_s / secondsToHoursDivisor;
    const minutesToHours = dec_m / minutesToHoursDivisor;

    dec = round(dec_d + secondsToHours + minutesToHours, 7);
    ra = round(ra_h + ra_m / 60 + ra_s / 3600, 7);
    
    if(isNegative(tempDec_d) && tempDec_d == "-0"){
      dec_d = '-0';
      dec = '-' + dec;
    }

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

    setCoordinatesData({
      dec_d,
      dec_m,
      dec_s,
      dec,
      ra_h,
      ra_m,
      ra_s,
      ra,
    });
  };

  render() {
    const { coordinatesData, pageConfig } = this.props;
    const { ra_h, ra_m, ra_s, ra, dec_d, dec_m, dec_s, dec } = coordinatesData;

    const {
      step2DecDMSPrompt,
      step2DecDecimalPrompt,
      step2RADecimalPrompt,
      step2RAHMSPrompt,
      step2Title,
      step2Tooltip,
    } = pageConfig;
    return (
      <div className="steps row">
        <div className="col-sm-12 step-2">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-step2">
                <span>{step2Tooltip}</span>
              </Tooltip>
            }
          >
            <span>{step2Title}</span>
          </OverlayTrigger>

          <div className="input-row">
            <div className="row-title col-md-1">{step2RAHMSPrompt.RA}</div>
            <div className="input-container col-md-11">
              <div className="coordinates-input">
                <input
                  type="text"
                  value={ra_h}
                  onChange={event => {
                    this.handleFieldChange({
                      field: 'ra_h',
                      value: event.target.value,
                    });
                  }}
                  onBlur={event => {
                    this.handleFieldBlur({
                      field: 'ra_h',
                      value: event.target.value,
                    });
                  }}
                />{' '}
                {step2RAHMSPrompt.h}
              </div>
              <div className="coordinates-input">
                <input
                  type="text"
                  value={ra_m}
                  onChange={event => {
                    this.handleFieldChange({
                      field: 'ra_m',
                      value: event.target.value,
                      allowNegativeValues: false,
                    });
                  }}
                  onBlur={event => {
                    this.handleFieldBlur({
                      field: 'ra_m',
                      value: event.target.value,
                    });
                  }}
                />{' '}
                {step2RAHMSPrompt.m}
              </div>
              <div className="coordinates-input">
                <input
                  type="text"
                  maxLength={MAX_SECONDS_CHARACTER_LENGTH}
                  value={ra_s}
                  onChange={event => {
                    this.handleSecondsChange({
                      field: 'ra_s',
                      valueRAW: event.target.value,
                    });
                  }}
                  onBlur={event => {
                    this.handleSecondsBlur({
                      field: 'ra_s',
                      valueRAW: event.target.value,
                    });
                  }}
                />{' '}
                {step2RAHMSPrompt.s}
              </div>
            </div>
          </div>

          <div className="input-row">
            <div className="row-title col-md-1">{step2DecDMSPrompt.Dec}</div>
            <div className="input-container col-md-11">
              <div className="coordinates-input">
                <input
                  type="text"
                  value={dec_d}
                  onChange={event => {
                    this.handleFieldChange({
                      field: 'dec_d',
                      value: event.target.value,
                      allowNegativeValues: true,
                    });
                  }}
                  onBlur={event => {
                    this.handleFieldBlur({
                      field: 'dec_d',
                      value: event.target.value,
                      allowNegativeValues: true,
                    });
                  }}
                />{' '}
                {step2DecDMSPrompt.d}
              </div>
              <div className="coordinates-input">
                <input
                  type="text"
                  value={dec_m}
                  onChange={event => {
                    this.handleFieldChange({
                      field: 'dec_m',
                      value: event.target.value,
                    });
                  }}
                  onBlur={event => {
                    this.handleFieldBlur({
                      field: 'dec_m',
                      value: event.target.value,
                    });
                  }}
                />{' '}
                {step2DecDMSPrompt.m}
              </div>
              <div className="coordinates-input">
                <input
                  type="text"
                  maxLength={MAX_SECONDS_CHARACTER_LENGTH}
                  value={dec_s}
                  onChange={event => {
                    this.handleSecondsChange({
                      field: 'dec_s',
                      valueRAW: event.target.value,
                    });
                  }}
                  onBlur={event => {
                    this.handleSecondsBlur({
                      field: 'dec_s',
                      valueRAW: event.target.value,
                    });
                  }}
                />{' '}
                {step2DecDMSPrompt.s}
              </div>
            </div>
          </div>

          <div className="input-row second">
            <div className="row-title col-md-1">{step2RADecimalPrompt.RA}</div>
            <div className="input-container col-md-5">
              <div className="coordinates-input">
                <input
                  type="number"
                  value={ra}
                  maxLength="9"
                  min="0"
                  max="24"
                  step="0.0000001"
                  onChange={this.handleRAChange}
                  onBlur={this.handleRAChange}
                />{' '}
                {step2RADecimalPrompt.decimal}
              </div>
            </div>

            <div className="row-title col-md-1">
              {step2DecDecimalPrompt.Dec}
            </div>
            <div className="input-container col-md-5">
              <div className="coordinates-input">
                <input
                  type="number"
                  value={dec}
                  maxLength="9"
                  onChange={this.handleDECChange}
                  onBlur={this.handleDECChange}
                />{' '}
                {step2DecDecimalPrompt.decimal}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
