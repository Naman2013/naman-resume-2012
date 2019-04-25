import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  AllQuestions: {
    id: 'AskAnAstronomer.AllQuestions',
    defaultMessage: 'All Questions',
    description: 'AskAnAstronomer All Questions',
  },
  AllAnswered: {
    id: 'AskAnAstronomer.AllAnswered',
    defaultMessage: 'All Answered',
    description: 'AskAnAstronomer All Answered',
  },
  AllUnanswered: {
    id: 'AskAnAstronomer.AllUnanswered',
    defaultMessage: 'All Unanswered',
    description: 'AskAnAstronomer All Unanswered',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
