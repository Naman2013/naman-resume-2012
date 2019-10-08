import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  EmailRequierMessage: {
    id: 'Ecommerce.EmailRequierMessage',
    defaultMessage: 'Please enter in your email address.',
    description: 'Error message',
  },
  EmailsDontMatchMessage: {
    id: 'Ecommerce.EmailsDontMatchMessage',
    defaultMessage: 'The Login Email Address and the Login Email Verification fields must match.',
    description: 'Error message',
  },
  FirstNameRequierMessage: {
    id: 'Ecommerce.FirstNameRequierMessage',
    defaultMessage: 'Please enter in your first name.',
    description: 'Error message',
  },
  LastNameRequierMessage: {
    id: 'Ecommerce.LastNameRequierMessage',
    defaultMessage: 'Please enter in your last name.',
    description: 'Error message',
  },
  AstronomyClubRequierMessage: {
    id: 'Ecommerce.AstronomyClubRequierMessage',
    defaultMessage: 'Please enter in a name for your Astronomy Club.',
    description: 'Error message',
  },
  AgeRequierMessage: {
    id: 'Ecommerce.AgeRequierMessage',
    defaultMessage: 'You must certify whether you are 13 years and older.',
    description: 'Error message',
  },
  MinAgeErrorMessage: {
    id: 'Ecommerce.MinAgeErrorMessage',
    defaultMessage:
      'You have indicated you are under 13 years old, please certify that your Legal Guardian has signed you up for this service.',
    description: 'Error message',
  },
  ParentEmailRequierMessage: {
    id: 'Ecommerce.ParentEmailRequierMessage',
    defaultMessage:
      "You have indicated you are under 13 years old, please enter in your Legal Guardian's Email Address.",
    description: 'Error message',
  },
  PasswordRequierMessage: {
    id: 'Ecommerce.PasswordRequierMessage',
    defaultMessage: 'Please enter in a password.',
    description: 'Error message',
  },
  PasswordsDontMatchMessage: {
    id: 'Ecommerce.PasswordsDontMatchMessage',
    defaultMessage:
      'Your password and the password you entered into the verification field must match.',
    description: 'Error message',
  },
  YourSchool: {
    id: 'Ecommerce.YourSchool',
    defaultMessage: 'Your School',
    description: 'Ecommerce Your School',
  },
  YourSchoolDistrict: {
    id: 'Ecommerce.YourSchoolDistrict',
    defaultMessage: 'Your School District',
    description: 'Ecommerce Your School District',
  },
  Yes: {
    id: 'Ecommerce.Yes',
    defaultMessage: 'Yes',
    description: 'Yes',
  },
  No: {
    id: 'Ecommerce.No',
    defaultMessage: 'No',
    description: 'No',
  },
  GoToPayment: {
    id: 'Ecommerce.GoToPayment',
    defaultMessage: 'Go to payment',
    description: 'Go to payment button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
