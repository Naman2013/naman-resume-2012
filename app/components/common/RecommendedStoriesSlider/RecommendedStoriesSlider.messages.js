import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  NothingToShow: {
    id: 'Dashboard.NoStories',
    defaultMessage: 'There are no recommended stories.',
    description: 'On empty list message',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
