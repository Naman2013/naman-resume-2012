import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Select } from 'app/components/common/select';
import Button from 'app/components/common/style/buttons/Button';
import { ReservationModalCountdown } from '../../telescope-reservation/reservation-modal-countdown';
import './styles.scss';
import { fetchMissionQuota, stopMissionQuotaTimer } from '../../../../observatory-list/observatory-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MissionQuota } from '../../slooh-1000/mission-quota';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMissionQuota,
      stopMissionQuotaTimer,      
    },
    dispatch
  );

const mapStateToProps = (state) => ({
  missionQuota: state.observatoryList.missionQuota
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class CatalogSetup extends Component {

  state={
    showHoldOneHourButton: this.props.showHoldOneHourButtonWhenExpanded
  }

  componentDidMount(){
    this.props.fetchMissionQuota({ callSource: 'byCatalogV4' });
  }

  componentWillUnmount(){
    this.props.stopMissionQuotaTimer();
  }

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
      byTelescope,
      getTelescopeSlot,
      extendedTimer,
      onCountdownTick,
      countdown,
      onCountdownComplete,
      choosePrompt,
      completeReservationPromptLong,
      pageConfig,
      userHasHold,
      showHoldOneHourButtonWhenExpanded,
      missionQuota,
    } = this.props;

    const { explanation } = objectData;
    const {
      header,
      step1Title,
      step1Tooltip,
      step2ButtonCaption,
      step2DesignationPrompt,
      step2ExamplePrompt,
      step2FormatPrompt,
      step2Title,
      step2Tooltip,
      step3Title,
      step3Tooltip,
      step4ButtonCaption,
      step4Title,
      step4Tooltip,
      subheader,
      locked,
    } = pageConfig;       
    
    const { showHoldOneHourButton } = this.state;

    return (
      <div className="catalog-setup">
        <div className="row setup-header">
          <h2>{header}</h2>
          <p>{subheader}</p>
          <MissionQuota
            missionQuota={missionQuota}
          />
          {byTelescope && (
            <ReservationModalCountdown
              extendedTimer={extendedTimer}
              buttonOnClick={getTelescopeSlot}
              onCountdownTick={onCountdownTick}
              onCountdownComplete={onCountdownComplete}
              countdown={countdown}
              completeReservationPromptLong={completeReservationPromptLong}
              userHasHold={userHasHold}
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
              handleChange={setCatalog}
              options={catalogListOpts}
              placeholder={choosePrompt}
              value={selectedCatalog}
              isDisabled={disabled || locked}
            />
          </div>
        </div>

        <div className="steps row">
          <div className="col-sm-6 step-2">
            {/* <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step2">
                  <span>{step2Tooltip}</span>
                </Tooltip>
              }
            > */}
              <span>{step2Title}</span>
            {/* </OverlayTrigger> */}

            <textarea
              className="textarea designation"
              placeholder={step2DesignationPrompt}
              value={designation}
              onChange={locked ? () => {} : e => setDesignation(e.target.value)}
              disabled={disabled || locked}
            />

            <div className="designation-format">
              {step2FormatPrompt} {selectedCatalog ? selectedCatalogData.catFormat : ''}
            </div>

            <div className="designation-example">
              {step2ExamplePrompt} {selectedCatalog ? selectedCatalogData.catExample : ''}
            </div>

            <Button
              text={step2ButtonCaption}
              onClickEvent={() => checkCatalogVisibility(designation)}
              disabled={!selectedCatalog || !designation || disabled}
            />

            <div className="processing-explanation">{explanation}</div>
          </div>

          <div className="col-sm-6 step-3">
            <div className="step-header">
              {/* <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-step3">
                    <span>{step3Tooltip}</span>
                  </Tooltip>
                }
              > */}
                <span>{step3Title}</span>
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
                    // onClick={() => {setProcessingRecipe(item); this.callgetMissionSlot();}}
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
            {/* <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-step4">
                  <span>{step4Tooltip}</span>
                </Tooltip>
              }
            > */}
              <span>{step4Title}</span>
            {/* </OverlayTrigger> */}
          </div>

          <div className="col-sm-6 step-4">
            <Button
              text={step4ButtonCaption}
              onClickEvent={()=>{getMissionSlot(); this.setState({showHoldOneHourButton:false});}}
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
