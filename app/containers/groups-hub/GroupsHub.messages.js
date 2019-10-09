import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  loading: {
    id: 'Hubs.loading',
    defaultMessage: 'Loading',
    description: 'Hubs loading',
  },
  requestGroup: {
    id: 'Hubs.requestGroup',
    defaultMessage: 'Request Group',
    description: 'Hubs Request Group button',
  },
  noGroups: {
    id: 'Hubs.noGroups',
    defaultMessage: 'There are no groups.',
    description: 'Hubs no groups messages',
  },
  errorSubmitting: {
    id: 'Alerts.FormError',
    defaultMessage: 'There was an error submitting your form',
    description: 'Error submitting form',
  },
};

const definedMessages = messages;

export default definedMessages;
