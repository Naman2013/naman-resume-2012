import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Select } from '../../../../components/common/select';
import Button from '../../../../components/common/style/buttons/Button';
import './styles.scss';

export class Slooh1000Setup extends Component {
  render() {
    const {
      categoryListOpts,
      setCategory,
      objectListOpts,
      setObject,
      getMissionSlot,
      selectedCategorySlug,
      selectedObjectSlug,
    } = this.props;

    return (
      <div className="slooh-1000-setup">
        <div className="row setup-header">
          <h2>Set up with Slooh Recommender!</h2>
          <p>
            Welcome to the Slooh Recommender! Tell us what you want to see,
            we’ll tell you which scope to use, and the best time to see it!
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
              <span>Step 1: Choose Category</span>
            </OverlayTrigger>
            <Select
              handleChange={setCategory}
              options={categoryListOpts}
              placeholder="Choose"
              value={selectedCategorySlug}
            />
          </div>

          <div className="col-sm-6 step-2">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step1">
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
              isDisabled={objectListOpts.length === 0}
              value={selectedObjectSlug}
            />
          </div>
        </div>

        <div className="steps row">
          <div className="col-sm-6 messages">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step1">
                  <span>Step 3 info</span>
                </Tooltip>
              }
            >
              <p>Step 3: Click or tap to find</p>
            </OverlayTrigger>
          </div>

          <div className="col-sm-6 step-3">
            <Button
              text="Find a Mission"
              onClickEvent={getMissionSlot}
              disabled={!selectedCategorySlug || !selectedObjectSlug}
            />
          </div>
        </div>
      </div>
    );
  }
}
