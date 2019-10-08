import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Loading: {
    id: 'Dashboard.Loading',
    defaultMessage: 'Loading',
    description: 'Loading label text',
  },
  Details: {
    id: 'Dashboard.Details',
    defaultMessage: 'Details',
    description: 'Details button text',
  },
  By: {
    id: 'Dashboard.By',
    defaultMessage: 'By',
    description: 'By text',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
