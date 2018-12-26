import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  noShows: {
    id: 'Shows.LiveShow',
    defaultMessage: 'Live Show',
    description: 'Shows Live Show title',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
