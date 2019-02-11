import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  NothingToShow: {
    id: 'Dashboard.NoObservations',
    defaultMessage: 'There are no recommended observations.',
    description: 'On empty list message',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
