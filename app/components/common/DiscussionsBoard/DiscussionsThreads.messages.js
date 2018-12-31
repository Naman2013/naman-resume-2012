import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Comments: {
    id: 'AskAnAstronomer.Comments',
    defaultMessage: 'Comments',
    description: 'AskAnAstronomer Comments',
  },
  Loading: {
    id: 'AskAnAstronomer.Loading',
    defaultMessage: 'Loading',
    description: 'AskAnAstronomer Loading',
  },
  NoThreads: {
    id: 'AskAnAstronomer.NoThreads',
    defaultMessage: 'There is nothing to show here',
    description: 'AskAnAstronomer No Threads',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
