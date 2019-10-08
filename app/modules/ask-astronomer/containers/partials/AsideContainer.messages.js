import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  MVPHeader1: {
    id: 'AskAnAstronomer.MVPHeader1',
    defaultMessage: 'THIS OBJECT’S',
    description: 'AskAnAstronomer mvp header',
  },
  MVPHeader2: {
    id: 'AskAnAstronomer.MVPHeader2',
    defaultMessage: 'MVP ASTRONOMERS',
    description: 'AskAnAstronomer mvp header',
  },
  NoMVP: {
    id: 'AskAnAstronomer.NoMVP',
    defaultMessage: 'Sorry, there are no MVP Astronomers available.',
    description: 'AskAnAstronomer no mvp error',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
