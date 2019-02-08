import { defineMessages } from 'react-intl';
import { Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  AllQuestions: {
    id: 'Profile.AllQuestions',
    defaultMessage: 'All questions',
    description: 'Filter option',
  },
  Answered: {
    id: 'Profile.Answered',
    defaultMessage: 'Answered',
    description: 'Filter option',
  },
  Unanswered: {
    id: 'Profile.Unanswered',
    defaultMessage: 'Unanswered',
    description: 'Filter option',
  },
  AllUnanswered: {
    id: 'Profile.AllUnanswered',
    defaultMessage: 'All unanswered',
    description: 'Filter option',
  },
  ByMySpecialities: {
    id: 'Profile.ByMySpecialities',
    defaultMessage: 'By my specialities',
    description: 'Filter option',
  },
  YourAskedQuestions: {
    id: 'Profile.YourAskedQuestions',
    defaultMessage: 'You asked {count} questions',
    description: 'Count text',
  },
  YourAnsweredQuestions: {
    id: 'Profile.YourAnsweredQuestions',
    defaultMessage: 'You answered {count} questions',
    description: 'Count text',
  },
  QuestionsToAnswers: {
    id: 'Profile.QuestionsToAnswers',
    defaultMessage: 'ANSWER QUESTIONS, EARN GRAVITY',
    description: 'Count text',
  },
  InfoTileSubject: {
    id: 'Profile.InfoTileSubject',
    defaultMessage: 'You Haven’t Asked any Questions',
    description: 'Info tile',
  },
  InfoTileTitle: {
    id: 'Profile.InfoTileTitle',
    defaultMessage: 'Ask Some Questions to Earn Slooh Gravity!',
    description: 'Info tile',
  },
  AskAnAstronomer: {
    id: 'Profile.AskAnAstronomer',
    defaultMessage: 'Ask an Astronomer',
    description: 'Guide promo tile',
  },
  ViewGuide: {
    id: 'Profile.ViewGuide',
    defaultMessage: 'View Guide',
    description: 'Guide promo tile',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
