import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  loading: {
    id: 'Hubs.loading',
    defaultMessage: 'Loading',
    description: 'Hubs loading',
  },
  noStories: {
    id: 'Hubs.noStories',
    defaultMessage: 'There are no stories.',
    description: 'Hubs no quests messages',
  },
  submitStory: {
    id: 'Hubs.submitStory',
    defaultMessage: 'Submit Story',
    description: 'Hubs submit story button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
