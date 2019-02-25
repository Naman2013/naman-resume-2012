import { defineMessages } from 'react-intl';
import { type Messages } from 'utils/i18n/MessageDescriptor';

const messages: Messages = {
  MoreOptions: {
    id: 'Photos.CardMenu.MenuTitle',
    defaultMessage: 'More options',
    description: 'Menu title label.',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
