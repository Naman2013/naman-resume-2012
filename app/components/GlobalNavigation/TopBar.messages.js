import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  SignIn: {
    id: 'Navigation.SignIn',
    defaultMessage: 'Sign In',
    description: 'Navigation Sign In button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
