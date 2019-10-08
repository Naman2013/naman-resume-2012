import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Replies: {
    id: 'AskAnAstronomer.Replies',
    defaultMessage: 'Replies',
    description: 'AskAnAstronomer Replies',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
