import { type Messages } from 'app/utils/i18n/MessageDescriptor';

const messages: Messages = {
  Details: {
    id: 'Photos.ViewDetails',
    defaultMessage: 'View details',
    description: 'Label for MissionCard details button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
