import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  loading: {
    id: 'Hubs.loading',
    defaultMessage: 'Loading',
    description: 'Hubs loading',
  },
  noQuests: {
    id: 'Hubs.noQuests',
    defaultMessage: 'There are no quests.',
    description: 'Hubs no quests messages',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
