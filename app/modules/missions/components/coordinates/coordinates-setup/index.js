import React, { PureComponent } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Select } from 'app/components/common/select';
import Button from 'app/components/common/style/buttons/Button';
import { ReservationModalCountdown } from '../../telescope-reservation/reservation-modal-countdown';
import { CoordinatesCalculation } from '../coordinates-calculation';
import './styles.scss';

export class CoordinatesSetup extends PureComponent {

  state={
    showHoldOneHourButton: this.props.showHoldOneHourButtonWhenExpanded
  }

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
      categoryListOpts,
      setCategory,
      selectedCategorySlug,
      getMissionSlot,
      checkTargetVisibility,
      objectData,
      targetName,
      setTargetName,
      telescopeData,
      setProcessingRecipe,
      processingRecipe,
      disabled,
      byTelescope,
      getTelescopeSlot,
      extendedTimer,
      onCountdownTick,
      countdown,
      onCountdownComplete,
      setCoordinatesData,
      coordinatesData,
      choosePrompt,
      completeReservationPromptLong,
      pageConfig,
      userHasHold,
      editCoordinates,
      showHoldOneHourButtonWhenExpanded,
    } = this.props;
    const {
      header,
      step1Title,
      step1Tooltip,
      step3TargetPrompt,
      step3Title,
      step3Tooltip,
      step4ButtonCaption,
      step4Title,
      step4Tooltip,
      step5Title,
      step5Tooltip,
      step6ButtonCaption,
      step6Title,
      step6Tooltip,
      subheader,
      subheaderEdit,
    } = pageConfig;

    const { explanation } = objectData;
    const { ra, dec } = coordinatesData;

    const { showHoldOneHourButton } = this.state;

    return (
      <div className="coordinates-setup">
        <div className="row setup-header">
          <h2>{header}</h2>
          <p>{editCoordinates ? subheaderEdit : subheader }</p>
          {byTelescope && (
            <ReservationModalCountdown
              extendedTimer={extendedTimer}
              buttonOnClick={getTelescopeSlot}
              onCountdownTick={onCountdownTick}
              onCountdownComplete={onCountdownComplete}
              countdown={countdown}
              completeReservationPromptLong={completeReservationPromptLong}
              userHasHold={editCoordinates || userHasHold}
              showHoldOneHourButtonWhenExpanded={showHoldOneHourButtonWhenExpanded}
              showHoldOneHourButton={showHoldOneHourButton}
            />
          )}
        </div>

        <div className="steps row">
          <div className="col-sm-12 step-1">
            {/* <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step1">
                  <span>{step1Tooltip}</span>
                </Tooltip>
              }
            > */}
              <span>{step1Title}</span>
            {/* </OverlayTrigger> */}
            <Select
              handleChange={setCategory}
              options={categoryListOpts}
              renderOption={this.renderCategoryOption}
              placeholder={choosePrompt}
              value={selectedCategorySlug}
              isDisabled={disabled}
            />
          </div>
        </div>

        <CoordinatesCalculation
          setCoordinatesData={setCoordinatesData}
          coordinatesData={coordinatesData}
          pageConfig={pageConfig}
        />

        <div className="steps row">
          <div className="col-md-6 step-3-4">
            <div className="step-3">
              {/* <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-step2">
                    <span>{step3Tooltip}</span>
                  </Tooltip>
                }
              > */}
                <span>{step3Title}</span>
              {/* </OverlayTrigger> */}

              <textarea
                className="textarea designation"
                placeholder={step3TargetPrompt}
                value={targetName}
                onChange={e => setTargetName(e.target.value)}
                disabled={disabled}
              />
            </div>

            <div className="step-4">
              {/* <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-step2">
                    <span>{step4Tooltip}</span>
                  </Tooltip>
                }
              > */}
                <span>{step4Title}</span>
              {/* </OverlayTrigger> */}

              <Button
                text={step4ButtonCaption}
                onClickEvent={() => checkTargetVisibility(ra, dec)}
                disabled={!selectedCategorySlug || !ra || !dec || disabled}
              />

              <div className="processing-explanation">{explanation}</div>
            </div>
          </div>

          <div className="col-md-6 step-5">
            <div className="step-header">
              {/* <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-step3">
                    <span>{step5Tooltip}</span>
                  </Tooltip>
                }
              > */}
                <span>{step5Title}</span>
              {/* </OverlayTrigger> */}
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
            {/* <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step4">
                  <span>{step6Tooltip}</span>
                </Tooltip>
              }
            > */}
              <span>{step6Title}</span>
            {/* </OverlayTrigger> */}
          </div>

          <div className="col-sm-6 step-6">
            <Button
              text={step6ButtonCaption}
              onClickEvent={()=>{getMissionSlot(); this.setState({showHoldOneHourButton:false});}}
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
