import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Tour: {
    id: 'Dashboard.Tour',
    defaultMessage: 'Tour',
    description: 'Dashboard Tour popup label',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
