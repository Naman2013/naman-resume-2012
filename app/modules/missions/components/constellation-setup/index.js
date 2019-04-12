import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Select } from '../../../../components/common/select';
import Button from '../../../../components/common/style/buttons/Button';
import './styles.scss';

export class ConstellationSetup extends Component {
  render() {
    const {
      constellationListOpt,
      setConstellation,
      objectListOpts,
      setObject,
      getMissionSlot,
      selectedConstellation,
      selectedObjectId,
      disabled,
      availableMissions,
      noObjects,
    } = this.props;

    return (
      <div className="slooh-1000-setup">
        <div className="row setup-header">
          <h2>Set up a reservation by constellation!</h2>
          <p>
            Welcome to the Constellation! Tell us what you want to see, we’ll
            tell you which scope to use, and the best time to see it!
          </p>
        </div>

        <div className="steps row">
          <div className="col-sm-6 step-1">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step1">
                  <span>Step 1 info</span>
                </Tooltip>
              }
            >
              <span>Step 1: Choose Constellation</span>
            </OverlayTrigger>
            <Select
              handleChange={setConstellation}
              options={constellationListOpt}
              placeholder="Choose"
              value={selectedConstellation}
              isDisabled={disabled}
            />
          </div>

          <div className="col-sm-6 step-2">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step2">
                  <span>Step 2 info</span>
                </Tooltip>
              }
            >
              <span>Step 2: Choose Object</span>
            </OverlayTrigger>
            <Select
              handleChange={setObject}
              options={objectListOpts}
              placeholder="Choose"
              isDisabled={objectListOpts.length === 0 || disabled}
              value={selectedObjectId}
            />

            {availableMissions && (
              <div className="explanation">No objects available</div>
            )}

            {noObjects && (
              <div className="explanation">
                No objects werre found for {selectedConstellation}
              </div>
            )}
          </div>
        </div>

        <div className="steps row">
          <div className="col-sm-6 messages">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step3">
                  <span>Step 3 info</span>
                </Tooltip>
              }
            >
              <span>Step 3: Click or tap to find</span>
            </OverlayTrigger>
          </div>

          <div className="col-sm-6 step-3">
            <Button
              text="Find a Mission"
              onClickEvent={getMissionSlot}
              disabled={!selectedConstellation || !selectedObjectId || disabled}
            />
          </div>
        </div>
      </div>
    );
  }
}
