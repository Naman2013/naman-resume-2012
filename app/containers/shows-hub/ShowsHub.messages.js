import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  loading: {
    id: 'Hubs.loading',
    defaultMessage: 'Loading',
    description: 'Hubs loading',
  },
  noShowsHub: {
    id: 'Hubs.noShowsHub',
    defaultMessage: 'There are no shows.',
    description: 'Hubs no shows messages',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
