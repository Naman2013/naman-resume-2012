import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  ObservationsDetails: {
    id: 'Objects.ObservationsDetails',
    defaultMessage: 'Details',
    description: 'Observations Details',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
