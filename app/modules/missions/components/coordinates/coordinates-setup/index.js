import React, { PureComponent } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Select } from 'app/components/common/select';
import Button from 'app/components/common/style/buttons/Button';
import { ReservationModalCountdown } from '../../telescope-reservation/reservation-modal-countdown';
import { CoordinatesCalculation } from '../coordinates-calculation';
import './styles.scss';

export class CoordinatesSetup extends PureComponent {
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
      checkTargetVisibility,
      objectData,
      targetName,
      setTargetName,
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
      setCoordinatesData,
      coordinatesData,
    } = this.props;

    const { explanation } = objectData;
    const { ra, dec } = coordinatesData;

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

        <CoordinatesCalculation
          setCoordinatesData={setCoordinatesData}
          coordinatesData={coordinatesData}
        />

        <div className="steps row">
          <div className="col-md-6 step-3-4">
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
                placeholder="Type target name here"
                value={targetName}
                onChange={e => setTargetName(e.target.value)}
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
                text="Check Visibility"
                onClickEvent={() => checkTargetVisibility(ra, dec)}
                disabled={!selectedCategorySlug || !ra || !dec || disabled}
              />

              <div className="processing-explanation">{explanation}</div>
            </div>
          </div>

          <div className="col-md-6 step-5">
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
          <div className="col-sm-6 step-6">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step4">
                  <span>Step 6 info</span>
                </Tooltip>
              }
            >
              <span>Step 6: Click or tap to define</span>
            </OverlayTrigger>
          </div>

          <div className="col-sm-6 step-6">
            <Button
              text={byTelescope ? 'Define Mission' : 'Find a Mission'}
              onClickEvent={getMissionSlot}
              disabled={
                !processingRecipe.presetOption ||
                !selectedCategorySlug ||
                disabled
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
