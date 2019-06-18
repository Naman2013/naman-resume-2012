// @flow

import { Modal } from 'app/components/modal';
import { Spinner } from 'app/components/spinner/index';
import { PaymentStep } from 'app/modules/account-settings/components/upgrade-modal/payment-step';
import { SelectPlanStep } from 'app/modules/account-settings/components/upgrade-modal/select-plan-step';
import { CancelStep } from 'app/modules/account-settings/components/upgrade-modal/cancel-step';
import { destroySession, removeUser } from 'app/modules/User';
import { Link, browserHistory } from 'react-router';
import Btn from 'app/atoms/Btn';
import '../../styles.scss';

import React, { useEffect, useState } from 'react';

type TUpgradeModal = {
  show: boolean,
  onHide: Function,

  getSubscriptionPlans: Function,
  subscriptionPlansData: any,
  selectedPlanId?: string,
  isFetching: Boolean,
};

type TSteps = 'SELECT_PLAN' | 'PAYMENT';

const didMount = (props: TUpgradeModal) => () => {
  const {
    getSubscriptionPlans,
    selectedPlanId,
    subscriptionPlansCallSource,
  } = props;
  getSubscriptionPlans({
    selectedPlanId,
    callSource: subscriptionPlansCallSource,
  });
};

export const UpgradeModal = (props: TUpgradeModal) => {
  const [step, setStep, dispatch] = useState<TSteps>('SELECT_PLAN');
  useEffect(didMount(props), []);

  const {
    show,
    onHide,
    isFetching,
    subscriptionPlansData,
    errorData, // errors from issue with user account modal
    disableGoBack,
  } = props;

  const [selectedPlanId, setSelectedPlanId] = useState(null);

  let buttonText = 'GO BACK';
  let onCloseFunc = onHide;
  let myDisableGoBack = false;

  if (step == "CANCEL") {
    myDisableGoBack = true;
  }

  if (props.subscriptionPlansCallSource == 'forcedsloohcrew') {
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
                subscriptionPlansData,
                selectedPlanId,
                isFetching,
              }}
              goNext={planId => setStep('PAYMENT')}
              setSelectedPlanId={setSelectedPlanId}
            />
            {props.subscriptionPlansCallSource == 'downgrade' && <div style={{width: "100%", minWidth: "100%", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
              <br/>
              <br/>
              <Btn className='white-button' onClick={() => setStep('CANCEL')}>Cancel My Account</Btn>
            </div>
            }
          </>
        )}

        {step === 'PAYMENT' && <PaymentStep conditionType={props.subscriptionPlansCallSource} selectedPlanId={selectedPlanId} />}

        {step === 'CANCEL' && <CancelStep {...props}/>}
      </Modal>
    </>
  );
};
