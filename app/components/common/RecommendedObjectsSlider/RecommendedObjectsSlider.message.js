import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  NothingToShow: {
    id: 'Dashboard.NoObjects',
    defaultMessage: 'There are no recommended objects.',
    description: 'On empty list message',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
