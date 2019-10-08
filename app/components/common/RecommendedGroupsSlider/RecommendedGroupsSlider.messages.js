import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  NothingToShow: {
    id: 'Dashboard.NoGroups',
    defaultMessage: 'There are no recommended groups.',
    description: 'On empty list message',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
