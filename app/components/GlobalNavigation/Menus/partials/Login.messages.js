import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  SignIn: {
    id: 'Dashboard.SignIn',
    defaultMessage: 'Sign-In',
    description: 'Dashboard Sign In button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
