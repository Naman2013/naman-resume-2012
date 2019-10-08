import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  ReadMore: {
    id: 'Objects.ReadMore',
    defaultMessage: 'Loading',
    description: 'Label to extand text',
  },
  ReadLess: {
    id: 'Objects.ReadLess',
    defaultMessage: 'read less',
    description: 'Label to shrink text',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
