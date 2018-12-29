import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  SignupRequestExpireTime: {
    id: 'Ecommerce.SignupRequestExpireTime',
    defaultMessage: 'This signup request will expire in {minutes}:{seconds}.',
    description: 'Signup request expire time',
  },
  SignupRequestExpiered: {
    id: 'Ecommerce.SignupRequestExpiered',
    defaultMessage: 'Signup request expired...redirecting to the homepage in 00:{seconds}.',
    description: 'Signup request expired',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
