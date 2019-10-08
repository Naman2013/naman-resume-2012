import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  loading: {
    id: 'Hubs.loading',
    defaultMessage: 'Loading',
    description: 'Hubs loading',
  },
  noGuides: {
    id: 'Hubs.noGuides',
    defaultMessage: 'There are no guides.',
    description: 'Hubs no guides messages',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
