import { connect } from 'react-redux';
import { compose } from 'redux';
import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import {
  makeAccountTypeSectionSelector,
  makeAccountDetailsSelector,
  makeAccountCancelSectionSelector,
  makeEmailSelector,
  makeShowPasswordPopupSelector,
  makePasswordPopupTextSelector,
} from '../selectors';
import {
  fetchAccountFormFieldAction,
  resetPassword,
  dismissResetPasswordPopup,
} from '../thunks';
import { AccountDetails } from '../components/account-details';

const mapStateToProps = createStructuredSelector({
  accountTypeSection: makeAccountTypeSectionSelector(),
  accountDetails: makeAccountDetailsSelector(),
  accountCancelSection: makeAccountCancelSectionSelector(),
  accountEmail: makeEmailSelector(),
  showForgetPasswordPopup: makeShowPasswordPopupSelector(),
  forgetPasswordPopupText: makePasswordPopupTextSelector(),
});

const mapDispatchToProps = {
  fetchAccountFormFieldAction,
  resetPassword,
  dismissResetPasswordPopup,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountDetails);
