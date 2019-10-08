import { type Messages } from '../../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  CompletedIcon: {
    id: 'Quests.CompletedIcon',
    defaultMessage: 'completed icon',
    description: 'Guides completed icon',
  },
  IncompletedIcon: {
    id: 'Quests.IncompletedIcon',
    defaultMessage: 'incompleted icon',
    description: 'Guides completed icon',
  },
  GoTo: {
    id: 'Quests.GoTo',
    defaultMessage: 'go to',
    description: 'Guides go to',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
