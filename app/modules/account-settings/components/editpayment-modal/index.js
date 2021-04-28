// @flow

import { Modal } from 'app/components/modal';
import { Spinner } from 'app/components/spinner/index';

import { destroySession, removeUser } from 'app/modules/User';
import { Link, browserHistory } from 'react-router';
import Btn from 'app/atoms/Btn';
import '../../styles.scss';

import React, { Fragment, useEffect, useState } from 'react';

import { API } from 'app/api';

import { getUserInfo } from 'app/modules/User';

import {
  EDIT_PAYMENT_ENDPOINT_URL,
} from 'app/services/registration/registration.js';

type TEditPaymentModal = {
  show: boolean,
  onHide: Function,
  getSubscriptionPlans: Function,
  subscriptionPlansData: any,
  selectedPlan?: Shape,
  isFetching: Boolean,
};

const didMount = (props: TEditPaymentModal) => () => {
  const {
    getSubscriptionPlans,
    selectedPlan,
    subscriptionPlansCallSource,
  } = props;
  getSubscriptionPlans({
    selectedPlan,
    callSource: subscriptionPlansCallSource,
  });

  //clear localStorage
  window.localStorage.removeItem('isClassroom');
  window.localStorage.removeItem('selectedSchoolId');
  window.localStorage.removeItem('isAstronomyClub');
  window.localStorage.removeItem('astronomyClubName');
  window.localStorage.removeItem('astronomyClub18AndOver');

  // window.removeEventListener('message',handleIframeTask);

  // //Listen for a message from the Window/IFrames to capture the ECommerce Hosted Payment Form Messaging
  // window.addEventListener('message', handleIframeTask);
  // window.removeEventListener('message', e => handleIframeTask(e, props));
  // window.addEventListener('message', e => handleIframeTask(e, props));
};



export const EditPaymentModal = (props: TEditPaymentModal) => {  
  didMount();
  const handleIframeTask = (e) => {
    const { fetchAccountSettingsAction, onHide } = props;
    /* Verify there is data in this event) */
    if (e.data) {
      const paymentMessageData = `${e.data}`;
  
      let paymentMethod = 'creditcard';
      let paymentNonceTokenData = null;
      
      var paymentDataString = paymentMessageData.split('!952bccf9afe8e4c04306f70f7bed6610');
  
     
      /* make sure the data message we received is an ECommerce Payment Token */
      if (paymentDataString[0].startsWith('__ECOMMERCE_PAYMENT_TOKEN_')) {
        //Check to see if the payment token is a credit card payment token or a paypal payment token
        if (
          paymentDataString[0].startsWith('__ECOMMERCE_PAYMENT_TOKEN_CREDITCARD__')
        ) {
          paymentNonceTokenData = String.prototype.replace.call(
            paymentDataString[0],
            '__ECOMMERCE_PAYMENT_TOKEN_CREDITCARD__',
            ''
          );
          paymentMethod = 'creditcard';
        } else if (
          paymentDataString[0].startsWith('__ECOMMERCE_PAYMENT_TOKEN_PAYPAL__')
        ) {
          paymentNonceTokenData = String.prototype.replace.call(
            paymentDataString[0],
            '__ECOMMERCE_PAYMENT_TOKEN_PAYPAL__',
            ''
          );
  
          paymentMethod = 'paypal';
        }
       
        window.removeEventListener('message',myfunction);
        /* Process the Edit Payment Form */
        const editPaymentData = {
          paymentMethod,
          paymentToken: paymentNonceTokenData,
          cid: getUserInfo().cid,
          at: getUserInfo().at,
          token: getUserInfo().token,
          billingAddressString: paymentDataString[3],
        };
  //add string aboc to this //ADD THIS BACK AFTER TESTING
            API
        .post(
            EDIT_PAYMENT_ENDPOINT_URL,
            editPaymentData
          )
          .then(response => {
            const res = response.data;
            if (!res.apiError) {
              if (res.status === 'success') {
                //Cleanup local localStorage
                window.localStorage.removeItem('selectedPlanId');
  
                fetchAccountSettingsAction();
                onHide();
  
              } else {
                /* process / display error to user */
                document.getElementById('embeddedHostedPaymentForm').contentWindow.captureActivationError(res);
              }
            }
          })
          .catch(err => {
            throw ('Error: ', err);
          });
        }
      }
    };
  var myfunction=(e)=>handleIframeTask(e);
  
  // useEffect(didMount(props), []);
  window.removeEventListener('message', myfunction);
  window.addEventListener('message', myfunction);

  const {
    show,
    onHide,
    isFetching,
    errorData, // errors from issue with user account modal
  } = props;

  let buttonText = 'GO BACK';
  let onCloseFunc = ()=>{window.removeEventListener('message', myfunction); onHide();};
  let myDisableGoBack = false;

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
        <h1 className="modal-h">{props.editPaymentHeading1}</h1>
        <p className="modal-p mb-5">{props.editPaymentHeading2}</p>

        {props.hostedPaymentFormURL && <Fragment><iframe style={{ backgroundColor: "white", width: '100%', minHeight: '750px' }} src={props.hostedPaymentFormURL}></iframe></Fragment>}
      </Modal>
    </>
  );
};
