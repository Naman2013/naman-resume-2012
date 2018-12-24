import { defineMessages } from 'react-intl';
import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  contentHeaderPlaceholder: {
    id: 'Stories.contentHeaderPlaceholder',
    defaultMessage: 'Type in a simple header',
    description: 'Stories create form header placeholder',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
