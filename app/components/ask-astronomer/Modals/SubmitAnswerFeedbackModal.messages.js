import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  AskAnAstronomer: {
    id: 'AskAnAstronomer.AskAnAstronomer',
    defaultMessage: 'Ask an Astronomer',
    description: 'Title',
  },
  Done: {
    id: 'AskAnAstronomer.Done',
    defaultMessage: 'Done',
    description: 'Done button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
