import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Questions: {
    id: 'AskAnAstronomer.Questions',
    defaultMessage: 'Questions',
    description: 'AskAnAstronomer Questions',
  },
  AskNow: {
    id: 'AskAnAstronomer.AskNow',
    defaultMessage: 'Ask Now',
    description: 'AskAnAstronomer Ask Now',
  },
  MVPAstronomers: {
    id: 'AskAnAstronomer.MVPAstronomers',
    defaultMessage: 'MVP Astronomers',
    description: 'AskAnAstronomer MVP Astronomers',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
