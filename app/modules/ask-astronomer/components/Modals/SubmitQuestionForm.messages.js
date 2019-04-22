import { defineMessages } from 'react-intl';
import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Guidelines: {
    id: 'AskAnAstronomer.Guidelines',
    defaultMessage: 'Guidelines',
    description: 'Guidelines button',
  },
  Cancel: {
    id: 'AskAnAstronomer.Cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button',
  },
  Submit: {
    id: 'AskAnAstronomer.Submit',
    defaultMessage: 'Submit',
    description: 'Submit button',
  },
  CommentPlaceholder: {
    id: 'AskAnAstronomer.CommentPlaceholder',
    defaultMessage: 'Write your comment',
    description: 'Comment placeholder',
  },
  AnswerPlaceholder: {
    id: 'AskAnAstronomer.AnswerPlaceholder',
    defaultMessage: 'Write your answer',
    description: 'Answer placeholder',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
