import { defineMessages } from 'react-intl';
import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  objectCategories: {
    id: 'Stories.objectCategories',
    defaultMessage: 'Object Categories',
    description: 'Stories create Object Categories',
  },
  objectTopics: {
    id: 'Stories.objectTopics',
    defaultMessage: 'Object Topics',
    description: 'Stories create Object Topics',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
