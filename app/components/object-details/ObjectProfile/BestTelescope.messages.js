import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  VisitTelescope: {
    id: 'Objects.VisitTelescope',
    defaultMessage: 'Visit telescope',
    description: 'Objects Visit telescope',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
