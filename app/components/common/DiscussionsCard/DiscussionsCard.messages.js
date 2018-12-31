import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Comments: {
    id: 'AskAnAstronomer.Comments',
    defaultMessage: 'Comments',
    description: 'AskAnAstronomer Comments',
  },
  Likes: {
    id: 'AskAnAstronomer.Likes',
    defaultMessage: 'Likes',
    description: 'AskAnAstronomer Likes',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
