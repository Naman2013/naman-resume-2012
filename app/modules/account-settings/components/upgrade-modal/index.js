// @flow

import { Modal } from 'app/components/modal';
import { Spinner } from 'app/components/spinner/index';
import { PaymentStep } from 'app/modules/account-settings/components/upgrade-modal/payment-step';
import { SelectPlanStep } from 'app/modules/account-settings/components/upgrade-modal/select-plan-step';
import { CancelStep } from 'app/modules/account-settings/components/upgrade-modal/cancel-step';
import { DowngradeStep } from 'app/modules/account-settings/components/upgrade-modal/downgrade-step';

import { destroySession, removeUser } from 'app/modules/User';
import { Link, browserHistory } from 'react-router';
import Btn from 'app/atoms/Btn';
import '../../styles.scss';

import React, { Fragment, useEffect, useState } from 'react';

import { getUserInfo, deleteSessionToken, deleteMarketingTrackingId } from 'app/modules/User';
import { UPGRADE_CUSTOMER_ENDPOINT_URL } from 'app/services/registration/registration.js';
import { API } from 'app/api';
import PlanDetailsCard from 'app/pages/registration/partials/PlanDetailsCard';
import Button from 'app/components/common/style/buttons/Button';
import { customModalStylesBlackOverlay } from 'app/styles/mixins/utilities';
import Popup from 'react-modal';
import { EditPaymentNew } from '../account-details/edit-payment-new';
import { AccountDetailsHeader } from '../account-details/header';
import { Col } from 'react-bootstrap';
import { fireSloohFBPurchaseEvent } from 'app/utils/fb-wrapper';
import { setSatelliteViewWidget } from 'app/modules/Telescope-Overview';

type TUpgradeModal = {
  show: boolean,
  onHide: Function,
  getSubscriptionPlans: Function,
  subscriptionPlansData: any,
  selectedPlan?: Shape,
  isFetching: boolean,
  returnLinkType: String,
  returnLinkLabel: String,
  returnLinkUrl: String,
};

type TSteps = 'SELECT_PLAN' | 'PAYMENT';

const didMount = (props: TUpgradeModal) => () => {
  const {
    getSubscriptionPlans,
    selectedPlan,
    subscriptionPlansCallSource,
    upsellCallSource,        
  } = props;
  getSubscriptionPlans({
    selectedPlan,
    callSource: subscriptionPlansCallSource,
    upsellCallSource: upsellCallSource,
    enableHiddenPlanHashCode: window.localStorage.getItem(
      'enableHiddenPlanHashCode'
    ),
  });
  
  //clear localStorage
  window.localStorage.removeItem('selectedSchoolId');
  window.localStorage.removeItem('isAstronomyClub');
};

export const UpgradeModal = (props: TUpgradeModal) => {
  const upgradeUser=(plan, upsellCallSource, subscriptionPlansCallSource)=>{   
    const { _sloohatid } = getUserInfo();
    const upgradeCustomerData = {
      cid: getUserInfo().cid,
      at: getUserInfo().at,
      token: getUserInfo().token,
      customerId: getUserInfo().cid,
      selectedPlanId: plan.planID,
      conditionType: subscriptionPlansCallSource,
      upsellCallSource: upsellCallSource, 
      // paymentMethod,
      processUsingExistingPaymentInfo: true,
      // paymentToken: paymentNonceTokenData,
      // billingAddressString: paymentDataString[3],
      // isAstronomyClub: window.localStorage.getItem('isAstronomyClub') === 'true',
      sloohMarketingTrackingId: _sloohatid,
    };
    setisFetching(true);
    //add string aboc to this //ADD THIS BACK AFTER TESTING
    API.post(UPGRADE_CUSTOMER_ENDPOINT_URL, upgradeCustomerData)
      .then(response => {
        const res = response.data;
        setisFetching(false);
        if (!res.apiError) {
          if (res.status === 'success') {
    //fire off the Purchase Facebook Event
    fireSloohFBPurchaseEvent( {
      cid: getUserInfo().cid, 
      planName: res.PlanName,
      planCostInUSD: res.PlanCostInUSD,
    });
  
    //clean up any session or marketing tracking id
    deleteSessionToken();
    deleteMarketingTrackingId();
  
            //Cleanup local localStorage
            window.localStorage.removeItem('pending_cid');
            window.localStorage.removeItem('selectedPlanId');
            window.localStorage.removeItem('isAstronomyClub');
  
            /* cleanup local storage */
            window.localStorage.removeItem('accountCreationType');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('password');

            //upgradeCustomer needs to return new "AT"
            //reset the AT cookie so all sub-sequent APIs use the new Account Type in their Request Params
            this.props.storeUserNewAT(res.newAccountTypeNbr).then(() => {
              props.closeModal(true);
              
             let confirmationPageURL = '/join/purchaseConfirmation/' + res.conditionType;
             browserHistory.push( confirmationPageURL );
  
             //browserHistory.push('/');
            });
          }          
        }
      })
      .catch(err => {
        throw ('Error: ', err);        
      });
  }
  const [step, setStep, dispatch] = useState<TSteps>('SELECT_PLAN');
  
    useEffect(didMount(props), [props.subscriptionPlansCallSource]);
    
  const {
    show,
    onHide,    
    subscriptionPlansData,
    subscriptionPlansCallSource,
    errorData, // errors from issue with user account modal
    disableGoBack,
    preSelectedPlan,
    storeUserNewAT,
    upsellCallSource,    
    returnLinkType,
    returnLinkLabel,
    returnLinkUrl,
  } = props;
  const [isFetching, setisFetching]=useState(props.isFetching);
  const {confirmationPopupDetails, curPaymentInfo} =subscriptionPlansData;
  const [selectedPlan, setSelectedPlan] = useState(null);
  useEffect(() => {setisFetching(props.isFetching);}, [props.isFetching]);
  let buttonText = (returnLinkType && returnLinkType === "close") ? returnLinkLabel : 'GO BACK';
  let onCloseFunc = onHide;
  let myDisableGoBack = false;

  if (step == 'CANCEL') {
    myDisableGoBack = true;
  }

  if (
    props.subscriptionPlansCallSource == 'forcedsloohcrew' ||
    props.subscriptionPlansCallSource == 'expired' ||
    props.subscriptionPlansCallSource == 'expiredrecently'
  ) {
    buttonText = 'LOGOUT';
    onCloseFunc = dispatch => {
      //Force Logout the User - They have opted to not buy a Slooh Plan
      destroySession();
      removeUser();
      onHide();
      browserHistory.push('/');
      window.location.reload();
    };
  } 
  return (
    <>
      <Modal
        show={show}
        onHide={onCloseFunc}
        goBackText={buttonText}
        mobileGoBackText={buttonText}
        disableGoBack={myDisableGoBack}
      >
        <Spinner transparent loading={isFetching} />

        {step === 'SELECT_PLAN' && (
          <>
            <SelectPlanStep
              {...{
                subscriptionPlansCallSource,
                subscriptionPlansData,
                selectedPlan,
                isFetching,                
              }}
              goNext={(subscriptionPlansCallSource, selectedPlan) => {
                if (subscriptionPlansCallSource == 'downgrade') {
                  setStep('DOWNGRADE');
                } else { 
                  if(subscriptionPlansData.hasPaymentInfoOnFile){
                    selectedPlan.editPaymentSection.curPaymentInfo=curPaymentInfo;
                    setStep('CONFIRM');                    
                  }
                  else
                    setStep('PAYMENT');
                }
              }}
              setSelectedPlan={setSelectedPlan}
            />
            {props.subscriptionPlansCallSource == 'downgrade' && (
              <div
                style={{
                  width: '100%',
                  minWidth: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textAlign: 'center',
                }}
              >
                <br />
                <br />
                <Btn className="white-button" onClick={() => setStep('CANCEL')}>
                  Cancel My Account
                </Btn>
              </div>
            )}
          </>
        )}

        {step === 'CONFIRM' &&(
        //   <Popup
        //   ariaHideApp={false}
        //   isOpen={true}
        //   style={customModalStylesBlackOverlay}
        //   contentLabel="Confirmation"
        //   shouldCloseOnOverlayClick={false}
        //   onRequestClose={()=>{setStep('SELECT_PLAN');}}
        // >
	  <Fragment>
	          <h1 className="modal-h">{selectedPlan.accountCardSection.pageHeading1}</h1>
        	  <p className="modal-p mb-5">{selectedPlan.accountCardSection.pageHeading2}</p>
	          <div className="confirm-dialog">
        	  	<AccountDetailsHeader headerClass={'h-2 h-2-md text-no-transform'} title={selectedPlan.accountCardSection.accountCardHeading1} showhr={false}/>
                
            		<PlanDetailsCard 
           		 	{...selectedPlan}
            			flexClass={'flex-without-padding'}
            		/>

            		<div className="actions">
        	      		{confirmationPopupDetails.showCancelBtn ? <Button onClickEvent={()=>{setStep('SELECT_PLAN');}} text={confirmationPopupDetails.cancelBtnTxt} /> : null}	
        	      		{confirmationPopupDetails.showConfirmBtn ? <Button isActive={true}
        	        		onClickEvent={()=>{upgradeUser(selectedPlan,upsellCallSource, subscriptionPlansCallSource)}}
                			text={confirmationPopupDetails.confirmBtnTxt}
              			/> : null}
            		</div>
               	   </div>
		   <br/>
	           <div className="confirm-dialog">
              		<EditPaymentNew {...selectedPlan} onbtnClick={()=>{setStep('PAYMENT');}}/>
          	   </div>
	 </Fragment>   
        // </Popup>       
        )}

        {step === 'PAYMENT' && (        
            <PaymentStep
              conditionType={props.subscriptionPlansCallSource}
              selectedPlan={selectedPlan}
              closeModal={onHide}
              storeUserNewAT={storeUserNewAT}
            />                    
        )}

        {step === 'CANCEL' && <CancelStep {...props} />}

        {step === 'DOWNGRADE' && (
          <DowngradeStep
            {...props}
            conditionType={props.subscriptionPlansCallSource}
            selectedPlan={selectedPlan}
          />
        )}
      </Modal>
      <style jsx>{`
          .confirm-dialog {
            background-color: #FFF;
            padding: 20px;      
            border-radius: 4px;
            border: 0px;             
            outline: none;  
            width: 100%;
            margin: 0 auto;
            max-width: 100%;
            min-width: 300px;
            // margin-right: -50%;
            // transform: translate(-50%, -50%);
          }

          .actions{
            display: flex;       
            justify-content: space-between;   
            height: 39px;  
          }
        `}</style>
    </>
  );
};
