import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  TopAnswer: {
    id: 'AskAnAstronomer.TopAnswer',
    defaultMessage: 'Top Answer',
    description: 'AskAnAstronomer Top Answer',
  },
  Replies: {
    id: 'AskAnAstronomer.Replies',
    defaultMessage: 'Replies',
    description: 'Replies button',
  },
  Reply: {
    id: 'AskAnAstronomer.Reply',
    defaultMessage: 'Reply',
    description: 'Reply button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
