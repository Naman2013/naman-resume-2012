import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  MissingRequired: {
    id: 'Alerts.MissingRequired',
    defaultMessage: 'You are missing a required field.',
    description: 'Missing required field message.',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
