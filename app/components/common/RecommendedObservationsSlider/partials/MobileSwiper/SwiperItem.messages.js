import { defineMessages } from 'react-intl';
import { type Messages } from '../../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  LoadingImage: {
    id: 'Dashboard.LoadingImage',
    defaultMessage: 'Loading image',
    description: 'On load image text',
  },
  // Details: {
  //   id: 'Dashboard.Details',
  //   defaultMessage: 'Details',
  //   description: 'Details section text',
  // },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
