import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  RelatedObjects: {
    id: 'Objects.RelatedObjects',
    defaultMessage: 'Related Objects',
    description: 'Objects Related Objects',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
