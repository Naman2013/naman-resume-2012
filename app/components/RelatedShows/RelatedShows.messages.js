import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  RelatedShows: {
    id: 'Shows.RelatedShows',
    defaultMessage: 'Related Shows',
    description: 'Shows Related Shows',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
