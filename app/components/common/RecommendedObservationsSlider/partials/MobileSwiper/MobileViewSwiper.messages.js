import { defineMessages } from 'react-intl';
import { type Messages } from '../../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  ErrorWhileLoading: {
    id: 'Dashboard.ErrorWhileLoading',
    defaultMessage: 'Error occured while loading data.',
    description: 'Text to show for responce with error',
  },
  Details: {
    id: 'Dashboard.Details',
    defaultMessage: 'Details',
    description: 'Details button text',
  },
  Loading: {
    id: 'Dashboard.Loading',
    defaultMessage: 'Loading',
    description: 'Loading',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
