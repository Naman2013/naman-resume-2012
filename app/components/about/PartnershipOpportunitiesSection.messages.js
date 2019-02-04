import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Submit: {
    id: 'About.Submit',
    defaultMessage: 'Submit',
    description: 'Button text',
  },
  Cancel: {
    id: 'About.Cancel',
    defaultMessage: 'Cancel',
    description: 'Button text',
  },
  NamePlaceholder: {
    id: 'About.NamePlaceholder',
    defaultMessage: 'Enter your fullname',
    description: 'Placeholder',
  },
  EmailPlaceholder: {
    id: 'About.EmailPlaceholder',
    defaultMessage: 'Enter your email',
    description: 'Placeholder',
  },
  MessagePlaceholder: {
    id: 'About.MessagePlaceholder',
    defaultMessage: 'Write us',
    description: 'Placeholder',
  },
  NameLabel: {
    id: 'About.NameLabel',
    defaultMessage: 'Your Name',
    description: 'Label for fullName input',
  },
  EmailLabel: {
    id: 'About.EmailLabel',
    defaultMessage: 'Your Email Adress',
    description: 'Label for emailAddress input',
  },
  Success: {
    id: 'About.Success',
    defaultMessage: 'Success',
    description: 'Status label',
  },
  Error: {
    id: 'About.Error',
    defaultMessage: 'Error',
    description: 'Status label',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
