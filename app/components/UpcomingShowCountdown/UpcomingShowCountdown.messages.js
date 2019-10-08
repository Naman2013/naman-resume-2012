import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  CountdownToShow: {
    id: 'Shows.CountdownToShow',
    defaultMessage: 'Countdown to show',
    description: 'Countdown to show',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
