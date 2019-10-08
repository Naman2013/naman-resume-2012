import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  JoinSlooh: {
    id: 'Ecommerce.JoinSlooh',
    defaultMessage: 'Join Slooh!',
    description: 'Join Slooh',
  },
  JoinSloohTrial: {
    id: 'Ecommerce.JoinSloohTrial',
    defaultMessage: 'Join today and get a 14 day free trial',
    description: 'Join Slooh Trial',
  },
  JoinNow: {
    id: 'Ecommerce.JoinNow',
    defaultMessage: 'Join Now',
    description: 'Join Now',
  },
  GoBack: {
    id: 'Ecommerce.GoBack',
    defaultMessage: 'Go Back',
    description: 'Go Back button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
