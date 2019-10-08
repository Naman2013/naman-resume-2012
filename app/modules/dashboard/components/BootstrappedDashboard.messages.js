import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  welcome: {
    id: 'Dashboard.welcome',
    defaultMessage: 'Welcome',
    description: 'Dashboard welcome image alt',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
