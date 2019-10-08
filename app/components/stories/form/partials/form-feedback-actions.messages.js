import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  goBackToHub: {
    id: 'Stories.goBackToHub',
    defaultMessage: 'Go Back to Stories Hub',
    description: 'Stories Go Back to Stories Hub',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
