import { defineMessages } from 'react-intl';
import { type Messages } from '../../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Close: {
    id: 'Quests.Close',
    defaultMessage: 'Close',
    description: 'Guides Close button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
