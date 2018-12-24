import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  relatedStories: {
    id: 'Stories.relatedStories',
    defaultMessage: 'Related Stories',
    description: 'Stories Related Stories',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
