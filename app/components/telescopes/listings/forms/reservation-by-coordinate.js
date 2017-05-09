/**
  NOTES:
  underscores used in some naming to improve legability

  TODO: refactor how the form works to allow users to use the minus key while
  entering a coordinate
  */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReservationSelectList from '../../../common/forms/reservation-select-list';
import TargetValidationForm from '../../../reserve/target-validation-form';
import Timer from './common/timer';
import style from './reservation-by-coordinate.scss';
import { fetchPresetOptions } from '../../../../modules/get-preset-options/get-preset-options-actions';
import { checkTargetVisibility } from '../../../../modules/check-target-visibility/api';
import { grabMissionSlot, grabUpdateMissionSlot, missionConfirmOpen } from '../../../../modules/Missions';

function round(number, precision) {
  const factor = Math.pow(10, precision);
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
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
  if (isNaN(cleanedInput)) cleanedInput = 0;

  return parseFloat(cleanedInput);
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

    this.handleRaHChange = this.handleRaHChange.bind(this);
    this.handleRaMChange = this.handleRaMChange.bind(this);
    this.handleRaSChange = this.handleRaSChange.bind(this);
    this.handleDecDChange = this.handleDecDChange.bind(this);
    this.handleDecMChange = this.handleDecMChange.bind(this);
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
  handleRaHChange(event) {
    const newRAH = event.target.value;
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

  handleRaMChange(event) {
    const newRAM = event.target.value;

    if (!newRAM) {
      this.setState({
        ra_m: newRAM,
      });
      return;
    }

    this.calculateFields({
      ra_m: cleanCalcInput(newRAM),
    });
  }

  handleRaMBlur = (event) => {
    this.calculateFields({
      ra_m: cleanCalcInput(event.target.value),
    });
  }

  handleRaSChange(event) {
    const ras = event.target.value;
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

  // DEC change events
  handleDecDChange(event) {
    const decD = event.target.value;
    if (!decD) {
      this.setState({
        dec_d: decD,
      });
      return;
    }

    this.calculateFields({
      dec_d: cleanCalcInput(decD),
    });
  }

  handleDecDBlur = (event) => {
    this.calculateFields({
      dec_d: cleanCalcInput(event.target.value),
    });
  }

  handleDecMChange(event) {
    const decM = event.target.value;
    if (!decM) {
      this.setState({
        dec_m: decM,
      });
      return;
    }

    this.calculateFields({
      dec_m: cleanCalcInput(decM),
    });
  }

  handleDecMBlur = (event) => {
    this.calculateFields({
      dec_m: cleanCalcInput(event.target.value),
    });
  }

  handleDecSChange(event) {
    const decS = event.target.value;
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
    let sign = 1;

    if (dec > 90) {
      dec_d = 90;
      dec_m = 0;
      dec_s = 0;
      dec = 90.0;
    }

    if (dec < -90) {
      dec_d = -90;
      dec_m = 0;
      dec_s = 0;
      dec = -90.0;
    }

    sign = (dec >= 0) ? sign : -1;

    const absoluteDec = Math.abs(dec);
    dec_d = Math.trunc(absoluteDec);
    dec_m = Math.trunc((absoluteDec - dec_d) * 60);
    dec_s = Math.round((((absoluteDec - dec_d) * 60) - dec_m) * 60);

    if (dec_s == 60) {
      dec_s = 0;
      dec_m = dec_m++;

      if (dec_m == 60) {
        dec_m = 0;
        dec_d = dec_d++;

        if (dec_d > 90) {
          dec_d = 90;
          dec = sign * 90.0;
        }
      }
    }

    if (sign == -1 && dec_d == 0) {
      dec_d = '-' + dec_d;
    } else {
      dec_d = sign * dec_d;
    }

    this.setState({
      dec_d,
      dec_m,
      dec_s,
      dec,
      visibilityStatus: {},
    });
  }

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
    let { dec_d, dec_m, dec_s, ra_h, ra_m, ra_s } = Object.assign({}, this.state, values);
    let dec = round(dec_d + (dec_m / 60) + (dec_s / 3600), 6);
    let ra = round(ra_h + (ra_m / 60) + (ra_s / 3600), 6);

    if (dec > 90) {
      dec = 90.0;
      dec_d = 90;
      dec_m = 0;
      dec_s = 0;
    }

    if (dec < -90) {
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
                  <div className="form-row">RA: <input value={ra_h} onChange={this.handleRaHChange} onBlur={this.handleRaHBlur} size="2" className="generic-text-input" type="number" /> <span className="symbol-character">h</span></div>
                  <div className="form-row"><input value={ra_m} onChange={this.handleRaMChange} onBlur={this.handleRaMBlur} size="2" className="generic-text-input" type="number" /> <span className="symbol-character">m</span></div>
                  <div className="form-row"><input value={ra_s} onChange={this.handleRaSChange} onBlur={this.handleRaSBlur} size="2" className="generic-text-input" type="number" /> <span className="symbol-character">s</span></div>
                </div>

                <div className="form-row-container">
                  <div className="form-row">Dec: <input value={dec_d} onChange={this.handleDecDChange} onBlur={this.handleDecDBlur} size="2" className="generic-text-input" type="number" /> <span className="symbol-character">d</span></div>
                  <div className="form-row"><input value={dec_m} onChange={this.handleDecMChange} onBlur={this.handleDecMBlur} size="2" className="generic-text-input" type="number" /> <span className="symbol-character">m</span></div>
                  <div className="form-row"><input value={dec_s} onChange={this.handleDecSChange} onBlur={this.handleDecSBlur} size="2" className="generic-text-input" type="number" /> <span className="symbol-character">s</span></div>
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
  userHasReservation: bool.isRequired,
  targetName: string,
};

export default ReservationByCoordinate;
