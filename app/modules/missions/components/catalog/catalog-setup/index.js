import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Select } from 'app/components/common/select';
import Button from 'app/components/common/style/buttons/Button';
import { ReservationModalCountdown } from '../../telescope-reservation/reservation-modal-countdown';
import './styles.scss';

export class CatalogSetup extends Component {
  render() {
    const {
      catalogListOpts,
      setCatalog,
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
    } = this.props;

    const { explanation } = objectData;

    return (
      <div className="catalog-setup">
        <div className="row setup-header">
          <h2>Set up a catalog object mission reservation!</h2>
          <p>{description}</p>
          {byTelescope && (
            <ReservationModalCountdown
              extendedTimer={extendedTimer}
              buttonOnClick={getTelescopeSlot}
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
              <span>Step 1: Choose Catalog</span>
            </OverlayTrigger>
            <Select
              handleChange={setCatalog}
              options={catalogListOpts}
              placeholder="Choose"
              value={selectedCatalog}
              isDisabled={disabled}
            />
          </div>
        </div>

        <div className="steps row">
          <div className="col-sm-6 step-2">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step2">
                  <span>Step 2 info</span>
                </Tooltip>
              }
            >
              <span>Step 2: Enter Designation</span>
            </OverlayTrigger>

            <textarea
              className="textarea designation"
              placeholder="Type Designation here"
              value={designation}
              onChange={e => setDesignation(e.target.value)}
              disabled={disabled}
            />

            <div className="designation-format">
              FORMAT: {selectedCatalog ? selectedCatalogData.catFormat : ''}
            </div>

            <div className="designation-example">
              Example: {selectedCatalog ? selectedCatalogData.catExample : ''}
            </div>

            <Button
              text="Check Visability"
              onClickEvent={() => checkCatalogVisibility(designation)}
              disabled={!selectedCatalog || !designation || disabled}
            />

            <div className="processing-explanation">{explanation}</div>
          </div>

          <div className="col-sm-6 step-3">
            <div className="step-header">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-step3">
                    <span>Step 3 info</span>
                  </Tooltip>
                }
              >
                <span>Step 3: Image processing</span>
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
                  <span>Step 4 info</span>
                </Tooltip>
              }
            >
              <span>Step 4: Click or tap to find</span>
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
