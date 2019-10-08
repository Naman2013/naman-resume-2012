import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Slooh: {
    id: 'Dashboard.Slooh',
    defaultMessage: 'Slooh',
    description: 'Part of the card title',
  },
  Quest: {
    id: 'Dashboard.Quest',
    defaultMessage: 'Quest',
    description: 'Part of the card title',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
