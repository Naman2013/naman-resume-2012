import { defineMessages } from 'react-intl';
import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Options: {
    id: 'Dashboard.Options',
    defaultMessage: 'Options',
    description: 'Button text',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
