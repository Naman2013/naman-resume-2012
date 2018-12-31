import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  ForgotPasswordError: {
    id: 'Dashboard.ForgotPasswordError',
    defaultMessage: 'Please enter in an email address and then click Forgot Your Password again.',
    description: 'Log in Forgot Password Error',
  },
  ForgotPasswordRequest: {
    id: 'Dashboard.ForgotPasswordRequest',
    defaultMessage: 'Please Wait...Processing your Forgot Password Request.',
    description: 'Log in Forgot Password Request',
  },
  LoginFailed: {
    id: 'Dashboard.LoginFailed',
    defaultMessage: 'Login Failed. Please check your credentials.',
    description: 'Log in failed',
  },
  Close: {
    id: 'Dashboard.Close',
    defaultMessage: 'Close',
    description: 'Close button',
  },
  Email: {
    id: 'Dashboard.Email',
    defaultMessage: 'Email Address',
    description: 'Login email label',
  },
  Password: {
    id: 'Dashboard.Password',
    defaultMessage: 'Password',
    description: 'Login password lable',
  },
  SignWithEmail: {
    id: 'Dashboard.SignWithEmail',
    defaultMessage: 'Sign in with email',
    description: 'Sign in with email button',
  },
  Or: {
    id: 'Dashboard.Or',
    defaultMessage: 'or',
    description: 'or',
  },
  DontHaveAccount: {
    id: 'Dashboard.DontHaveAccount',
    defaultMessage: "Don't have an account?",
    description: "Don't have an account?",
  },
  JoinSloohToday: {
    id: 'Dashboard.JoinSloohToday',
    defaultMessage: 'Join Slooh Today',
    description: 'Join Slooh Today button',
  },
  HaveAnInvintationCode: {
    id: 'Dashboard.HaveAnInvintationCode',
    defaultMessage: 'Have an Invitation Code?',
    description: 'Have an Invitation Code label',
  },
  RedeemInvitationCode: {
    id: 'Dashboard.RedeemInvitationCode',
    defaultMessage: 'Redeem Invitation Code',
    description: 'Redeem Invitation Code button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
