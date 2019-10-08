import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  JoinMainHeader: {
    id: 'Ecommerce.JoinMainHeader',
    defaultMessage: 'Joining Slooh is easy!',
    description: 'Ecommerce join main header',
  },
  JoinSubHeader: {
    id: 'Ecommerce.JoinSubHeader',
    defaultMessage:
      "Join Slooh in three easy steps! Simply select a plan, enter your details, make your payment and you're in!",
    description: 'Ecommerce join sub header',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
