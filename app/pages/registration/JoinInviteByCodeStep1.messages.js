import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  PleaseEnterEmail: {
    id: 'Dashboard.PleaseEnterEmail',
    defaultMessage: 'Please enter in your email address.',
    description: 'Error message',
  },
  PleaseEnterInvitationCode: {
    id: 'Dashboard.PleaseEnterInvitationCode',
    defaultMessage: 'Please enter in your invitation code.',
    description: 'Error message',
  },
  GoBack: {
    id: 'Dashboard.GoBack',
    defaultMessage: 'Go Back',
    description: 'Go Back button',
  },
  Continue: {
    id: 'Dashboard.Continue',
    defaultMessage: 'Continue',
    description: 'Continue button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
