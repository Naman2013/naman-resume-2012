import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  ResponceSubmittedText: {
    id: 'Alerts.ResponceSubmitted',
    defaultMessage: 'Your response has been submitted.',
    description: 'Responce submitted messsage',
  },
  FormIssueText: {
    id: 'Alerts.FormIssue',
    defaultMessage: 'There was an issue submitting the form.',
    description: 'From submitting issue message',
  },
  WrittenBy: {
    id: 'Alerts.WrittenBy',
    defaultMessage: 'Written by',
    description: 'Label title',
  },
  Cancel: {
    id: 'Alerts.Cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button text',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
