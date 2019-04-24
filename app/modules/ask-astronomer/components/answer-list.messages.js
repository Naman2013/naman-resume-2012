import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Answers: {
    id: 'AskAnAstronomer.Answers',
    defaultMessage: 'Answers',
    description: 'AskAnAstronomer Answers',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
