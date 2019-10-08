import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  AddTagErrorText: {
    id: 'Alerts.AddTagError',
    defaultMessage: 'There was an error adding this tag',
    description: 'Tag add tag error message',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
