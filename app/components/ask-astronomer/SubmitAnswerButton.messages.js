import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Reply: {
    id: 'AskAnAstronomer.Reply',
    defaultMessage: 'Reply',
    description: 'AskAnAstronomer Reply',
  },
  AnswerPlaceholder: {
    id: 'AskAnAstronomer.AnswerPlaceholder',
    defaultMessage: 'Write your answer',
    description: 'AskAnAstronomer Answer Placeholder',
  },
  Error: {
    id: 'AskAnAstronomer.Error',
    defaultMessage: 'Error',
    description: 'AskAnAstronomer Error',
  },
  AnswerErrorText: {
    id: 'AskAnAstronomer.AnswerErrorText',
    defaultMessage: 'There was an issue submitting your reply.',
    description: 'AskAnAstronomer Answer Error Text',
  },
  Success: {
    id: 'AskAnAstronomer.Success',
    defaultMessage: 'Success',
    description: 'AskAnAstronomer Success',
  },
  AnswerSuccessText: {
    id: 'AskAnAstronomer.AnswerSuccessText',
    defaultMessage: 'You answer has been submitted!',
    description: 'AskAnAstronomer Answer Success Text',
  },
  SubmitAnswer: {
    id: 'AskAnAstronomer.SubmitAnswer',
    defaultMessage: 'Submit an Answer',
    description: 'AskAnAstronomer Submit an Answer button',
  },
  Discuss: {
    id: 'AskAnAstronomer.Discuss',
    defaultMessage: 'Discuss',
    description: 'AskAnAstronomer Discuss',
  },
  ReplyPlaceholder: {
    id: 'AskAnAstronomer.ReplyPlaceholder',
    defaultMessage: 'Write your public reply',
    description: 'AskAnAstronomer Reply Placeholder',
  },
  ReplySuccessText: {
    id: 'AskAnAstronomer.ReplySuccessText',
    defaultMessage: 'You reply has been submitted!',
    description: 'AskAnAstronomer Answer Success Text',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
