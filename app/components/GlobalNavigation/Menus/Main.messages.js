import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  title: {
    id: 'Navigation.title',
    defaultMessage: 'Slooh Menu',
    description: 'Navigation title',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
