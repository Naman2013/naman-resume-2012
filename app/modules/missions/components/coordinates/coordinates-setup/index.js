import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Select } from 'app/components/common/select';
import Button from 'app/components/common/style/buttons/Button';
import { ReservationModalCountdown } from '../../telescope-reservation/reservation-modal-countdown';
import './styles.scss';

export class CoordinatesSetup extends Component {
  renderCategoryOption = props => {
    const { categoryList } = this.props;
    const item = categoryList[props.data.value];

    return (
      <div
        {...props.innerProps}
        className={`dropdown-opt coordinates-${item.itemType}`}
      >
        <div className="dropdown-name">
          {item.itemIsEnabled && <img src={item.itemIconURL} alt="" />}
          {props.children}
        </div>
        <div className="focused-ind" />
      </div>
    );
  };

  render() {
    const {
      categoryList,
      categoryListOpts,
      setCategory,
      selectedCategorySlug,
      getMissionSlot,
      selectedCatalog,
      selectedCatalogData,
      checkCatalogVisibility,
      objectData,
      setDesignation,
      designation,
      telescopeData, 
      setProcessingRecipe,
      processingRecipe,
      disabled,
      description,
      byTelescope,
      getTelescopeSlot,
      extendedTimer,
      onCountdownTick,
      countdown,
      onCountdownComplete,
    } = this.props;

    const { explanation } = objectData;

    return (
      <div className="coordinates-setup">
        <div className="row setup-header">
          <h2>Set up by Coordinates!</h2>
          <p>{description}</p>
          {byTelescope && (
            <ReservationModalCountdown
              extendedTimer={extendedTimer}
              buttonOnClick={getTelescopeSlot}
              onCountdownTick={onCountdownTick}
              onCountdownComplete={onCountdownComplete}
              countdown={countdown}
            />
          )}
        </div>

        <div className="steps row">
          <div className="col-sm-12 step-1">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step1">
                  <span>Step 1 info</span>
                </Tooltip>
              }
            >
              <span>Step 1: Target object type</span>
            </OverlayTrigger>
            <Select
              handleChange={setCategory}
              options={categoryListOpts}
              renderOption={this.renderCategoryOption}
              placeholder="Choose"
              value={selectedCategorySlug}
              isDisabled={disabled}
            />
          </div>
        </div>

        <div className="steps row">
          <div className="col-sm-12 step-2">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step2">
                  <span>Step 2 info</span>
                </Tooltip>
              }
            >
              <span>Step 2: Enter Coordinates</span>
            </OverlayTrigger>

            <div className='input-row'>
              <div className="row-title col-md-1">RA:</div>
              <div className="input-container col-md-11">
                <div className="coordinates-input">
                  <input /> h
                </div>
                <div className="coordinates-input">
                  <input /> m
                </div>
                <div className="coordinates-input">
                  <input /> s
                </div>
              </div>
            </div>

            <div className='input-row'>
              <div className="row-title col-md-1">DEC:</div>
              <div className="input-container col-md-11">
                <div className="coordinates-input">
                  <input /> h
                </div>
                <div className="coordinates-input">
                  <input /> m
                </div>
                <div className="coordinates-input">
                  <input /> s
                </div>
              </div>
            </div>


            <div className='input-row second'>
              <div className="row-title col-md-1">RA:</div>
              <div className="input-container col-md-5">
                <div className="coordinates-input">
                  <input /> decimal
                </div>
              </div>

              <div className="row-title col-md-1">DEC:</div>
              <div className="input-container col-md-5">
                <div className="coordinates-input">
                  <input /> decimal
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="steps row">
          <div className="col-sm-6 step-3-4">
            <div className="step-3">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-step2">
                    <span>Step 3 info</span>
                  </Tooltip>
                }
              >
                <span>Step 3: Target name (optional)</span>
              </OverlayTrigger>

              <textarea
                className="textarea designation"
                placeholder="Type Designation here"
                value={designation}
                onChange={e => setDesignation(e.target.value)}
                disabled={disabled}
              />
            </div>

            <div className="step-4">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-step2">
                    <span>Step 4 info</span>
                  </Tooltip>
                }
              >
                <span>Step 4: Check Target Visibility</span>
              </OverlayTrigger>

              <Button
                text="Check Visability"
                onClickEvent={() => checkCatalogVisibility(designation)}
                disabled={!selectedCatalog || !designation || disabled}
              />

              <div className="processing-explanation">{explanation}</div>
            </div>
          </div>

          <div className="col-sm-6 step-5">
            <div className="step-header">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-step3">
                    <span>Step 5 info</span>
                  </Tooltip>
                }
              >
                <span>Step 5: Image processing</span>
              </OverlayTrigger>
            </div>

            <div className={`processing-list${disabled ? ' disabled' : ''}`}>
              {telescopeData.telePresetList &&
                telescopeData.telePresetList.map(item => (
                  <div
                    key={item.presetId}
                    className={`processing-list-item${
                      item.presetOption === processingRecipe.presetOption
                        ? ' selected'
                        : ''
                    }`}
                    onClick={() => setProcessingRecipe(item)}
                  >
                    <div className="processing-list-item-title">
                      {item.presetDisplayName}
                    </div>
                    <div className="focused-indicator" />
                  </div>
                ))}
            </div>

            <div className="processing-description">
              {processingRecipe.presetHelpText}
            </div>
          </div>
        </div>

        <div className="steps row">
          <div className="col-sm-6 step-4">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step4">
                  <span>Step 6 info</span>
                </Tooltip>
              }
            >
              <span>Step 6: Click or tap to define the mission</span>
            </OverlayTrigger>
          </div>

          <div className="col-sm-6 step-4">
            <Button
              text={byTelescope ? 'Define Mission' : 'Find a Mission'}
              onClickEvent={getMissionSlot}
              disabled={
                !designation ||
                !processingRecipe.presetOption ||
                !selectedCatalog ||
                disabled
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
