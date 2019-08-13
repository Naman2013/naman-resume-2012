// @flow

import { Modal } from 'app/components/modal';
import { Spinner } from 'app/components/spinner/index';

import { destroySession, removeUser } from 'app/modules/User';
import { Link, browserHistory } from 'react-router';
import Btn from 'app/atoms/Btn';
import '../../styles.scss';

import React, { Fragment, useEffect, useState } from 'react';

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
};

export const EditPaymentModal = (props: TEditPaymentModal) => {
  useEffect(didMount(props), []);

  const {
    show,
    onHide,
    isFetching,
    errorData, // errors from issue with user account modal
  } = props;

  let buttonText = 'GO BACK';
  let onCloseFunc = onHide;
  let myDisableGoBack = false;

  console.log(props);

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
