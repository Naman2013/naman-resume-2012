import { defineMessages } from 'react-intl';
import { type Messages } from 'app/utils/i18n/MessageDescriptor';

const messages: Messages = {
  Details: {
    id: 'Photos.Details',
    defaultMessage: 'Details',
    description: 'Details label on MissionCard',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
