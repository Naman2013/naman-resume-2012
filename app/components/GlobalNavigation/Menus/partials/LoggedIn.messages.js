import { defineMessages } from 'react-intl';
import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  LogOut: {
    id: 'Dashboard.LogOut',
    defaultMessage: 'Log Out',
    description: 'Dashboard Log Out button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
