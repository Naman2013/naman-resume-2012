import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  NothingToShow: {
    id: 'Dashboard.NoQuests',
    defaultMessage: 'There are no recommended quests.',
    description: 'On empty list message',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
