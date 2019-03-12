import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Select } from '../../../../components/common/select';
import Button from '../../../../components/common/style/buttons/Button';
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
    } = this.props;

    const { explanation } = objectData;

    return (
      <div className="catalog-setup">
        <div className="row setup-header">
          <h2>Set up a catalog object mission reservation!</h2>
          <p>
            Quickly schedule a mission by choosing from millions of cataloged
            objects. Tell us what you'd like to see. We'll find the best
            telescope to use and the best time to see it.
          </p>
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
            />

            <div className="designation-format">
              {selectedCatalog ? selectedCatalogData.catFormat : 'FORMAT'}
            </div>

            <div className="designation-example">
              Example: {selectedCatalog ? selectedCatalogData.catExample : ''}
            </div>

            <Button
              text="Check Visability"
              onClickEvent={() => checkCatalogVisibility(designation)}
              disabled={!selectedCatalog || !designation}
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

            <div className="processing-list">
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
              text="Find a Mission"
              onClickEvent={getMissionSlot}
              disabled={!designation || !processingRecipe || !selectedCatalog}
            />
          </div>
        </div>
      </div>
    );
  }
}
