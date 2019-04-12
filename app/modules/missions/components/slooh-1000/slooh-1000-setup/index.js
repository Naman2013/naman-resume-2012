import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Countdown from 'react-countdown-now';
import { FormattedNumber } from 'react-intl';
import { Select } from 'app/components/common/select';
import Button from 'app/components/common/style/buttons/Button';
import './styles.scss';

export class Slooh1000Setup extends Component {
  renderCategoryOption = props => {
    const { categoryList } = this.props;
    const item = categoryList[props.data.value];

    return (
      <div
        {...props.innerProps}
        className={`dropdown-opt slooh1000-${item.itemType}`}
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
      categoryListOpts,
      setCategory,
      objectListOpts,
      setObject,
      getMissionSlot,
      selectedCategorySlug,
      selectedObjectId,
      disabled,
      availableMissions,
      noObjects,
      description,
      byTelescope,
      getTelescopeSlot,
      extendedTimer,
    } = this.props;

    return (
      <div className="slooh-1000-setup">
        <div className="row setup-header">
          <h2>Set up with Slooh 1000!</h2>
          <p>{description}</p>
          {byTelescope && (
            <div className="by-telescope-reservation-countdown">
              <div className="countdown">
                <Countdown
                  date={
                    extendedTimer
                      ? Date.now() + 60 * 60 * 1000
                      : Date.now() + 5 * 60 * 1000
                  }
                  //onComplete={onCancel}
                  renderer={props => (
                    <div>
                      Please complete your reservation within {props.minutes}:
                      <FormattedNumber
                        value={props.seconds}
                        minimumIntegerDigits={2}
                      />
                    </div>
                  )}
                />
              </div>
              <Button
                text="Hold one hour"
                onClickEvent={getTelescopeSlot}
                //disabled={!selectedCategorySlug || !selectedObjectId || disabled}
              />
            </div>
          )}
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
              renderOption={this.renderCategoryOption}
              placeholder="Choose"
              value={selectedCategorySlug}
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
                No objects were found for{' '}
                {categoryListOpts[selectedCategorySlug].label}
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
              text={byTelescope ? 'Define Mission' : 'Find a Mission'}
              onClickEvent={getMissionSlot}
              disabled={!selectedCategorySlug || !selectedObjectId || disabled}
            />
          </div>
        </div>
      </div>
    );
  }
}
