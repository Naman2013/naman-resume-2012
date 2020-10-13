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
export class Slooh1000Setup extends Component {

  state={
    showHoldOneHourButton: this.props.showHoldOneHourButtonWhenExpanded
  }
  
  componentDidMount(){
    this.props.fetchMissionQuota({ callSource: 'bySlooh1000V4' });
  }

  componentWillUnmount(){
    this.props.stopMissionQuotaTimer();
  }

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
  // callgetMissionSlot(){
  //   const {selectedObjectId, getMissionSlot} = this.props;   
  //   selectedObjectId ? getMissionSlot() : setTimeout(this.callgetMissionSlot.bind(this), 1000);;    
  // }

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
      userHasHold,
      showHoldOneHourButtonWhenExpanded,
      missionQuota,
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
    
    const { showHoldOneHourButton } = this.state;
    
    return (
      <div className="slooh-1000-setup">
        <div className="row setup-header">
          <h2>{header}</h2>
          <p>{subheader}</p>
          {missionQuota && (
            <MissionQuota
              missionQuota={missionQuota}
            />
          )}
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
          <div className="col-sm-6 step-1">
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
            <Select
              // handleChange={(e)=>{setObject(e); this.callgetMissionSlot()}}
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

          <div className="col-sm-6 step-3">
            <Button
              text={step3ButtonCaption}
              onClickEvent={()=>{getMissionSlot(); this.setState({showHoldOneHourButton:false});}}
              disabled={!selectedCategorySlug || !selectedObjectId || disabled}
            />
          </div>
        </div>
      </div>
    );
  }
}
