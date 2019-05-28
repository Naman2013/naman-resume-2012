import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Select } from 'app/components/common/select';
import Button from 'app/components/common/style/buttons/Button';
import { ReservationModalCountdown } from '../../telescope-reservation/reservation-modal-countdown';
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
      byTelescope,
      getTelescopeSlot,
      extendedTimer,
      onCountdownTick,
      countdown,
      onCountdownComplete,
      choosePrompt,
      completeReservationPromptLong,
      pageConfig,
    } = this.props;
    const {
      header,
      step1Title,
      step1Tooltip,
      step2Title,
      step2Tooltip,
      step3ButtonCaption,
      step3Title,
      step3Tooltip,
      subheader,
    } = pageConfig;

    return (
      <div className="slooh-1000-setup">
        <div className="row setup-header">
          <h2>{header}</h2>
          <p>{subheader}</p>
          {byTelescope && (
            <ReservationModalCountdown
              extendedTimer={extendedTimer}
              buttonOnClick={getTelescopeSlot}
              onCountdownTick={onCountdownTick}
              onCountdownComplete={onCountdownComplete}
              countdown={countdown}
              completeReservationPromptLong={completeReservationPromptLong}
            />
          )}
        </div>

        <div className="steps row">
          <div className="col-sm-6 step-1">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step1">
                  <span>{step1Tooltip}</span>
                </Tooltip>
              }
            >
              <span>{step1Title}</span>
            </OverlayTrigger>
            <Select
              handleChange={setCategory}
              options={categoryListOpts}
              renderOption={this.renderCategoryOption}
              placeholder={choosePrompt}
              value={selectedCategorySlug}
              isDisabled={disabled}
            />
          </div>

          <div className="col-sm-6 step-2">
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
            <Select
              handleChange={setObject}
              options={objectListOpts}
              placeholder={choosePrompt}
              isDisabled={objectListOpts.length === 0 || disabled}
              value={selectedObjectId}
            />

            {availableMissions && (
              <div className="explanation">
                No available missions were found
              </div>
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
                  <span>{step3Tooltip}</span>
                </Tooltip>
              }
            >
              <span>{step3Title}</span>
            </OverlayTrigger>
          </div>

          <div className="col-sm-6 step-3">
            <Button
              text={step3ButtonCaption}
              onClickEvent={getMissionSlot}
              disabled={!selectedCategorySlug || !selectedObjectId || disabled}
            />
          </div>
        </div>
      </div>
    );
  }
}
