import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  noShows: {
    id: 'Hubs.noShows',
    defaultMessage: 'There are no upcoming shows.',
    description: 'Hubs no shows messages',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
