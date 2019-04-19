import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Loading: {
    id: 'Objects.Loading',
    defaultMessage: 'Loading',
    description: 'Loading label text',
  },
  Details: {
    id: 'Objects.ObservationsDetails',
    defaultMessage: 'Details',
    description: 'Observations Details',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
