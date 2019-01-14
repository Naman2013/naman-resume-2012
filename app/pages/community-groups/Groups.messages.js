import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  errorSubmitting: {
    id: 'Alerts.FormError',
    defaultMessage: 'There was an error submitting your form',
    description: 'Error submitting form',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
