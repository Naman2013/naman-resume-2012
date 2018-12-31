import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  CommentErrorText: {
    id: 'AskAnAstronomer.CommentErrorText',
    defaultMessage: 'There was an error submitting your comment.',
    description: 'AskAnAstronomer Comment error',
  },
  CommentSuccessText: {
    id: 'AskAnAstronomer.CommentSuccessText',
    defaultMessage: 'Your comment has been submitted',
    description: 'AskAnAstronomer Comment Success Text',
  },
  PublicCommentPlaceholder: {
    id: 'AskAnAstronomer.PublicCommentPlaceholder',
    defaultMessage: 'Write a public comment',
    description: 'AskAnAstronomer Public Comment Placeholder',
  },
  Reply: {
    id: 'AskAnAstronomer.Reply',
    defaultMessage: 'Reply',
    description: 'AskAnAstronomer Reply button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
