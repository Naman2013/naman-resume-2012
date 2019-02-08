import { defineMessages } from 'react-intl';
import { Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  QaSectionTitle: {
    id: 'Profile.QaSectionTitle',
    defaultMessage: 'MY Q&A HUB',
    description: 'Qa tab title',
  },
  MyQuestions: {
    id: 'Profile.MyQuestions',
    defaultMessage: 'My questions',
    description: 'Qa tab navigation item',
  },
  MyAnswers: {
    id: 'Profile.MyAnswers',
    defaultMessage: 'My answers',
    description: 'Qa tab navigation item',
  },
  QuestionsToAnswer: {
    id: 'Profile.QuestionsToAnswer',
    defaultMessage: 'Questions to answer',
    description: 'Qa tab navigation item',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
