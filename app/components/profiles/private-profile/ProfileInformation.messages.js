import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Gravity: {
    id: 'Profile.Gravity',
    defaultMessage: 'Gravity',
    description: 'Profile statistic label',
  },
  Badges: {
    id: 'Profile.Badges',
    defaultMessage: 'Badges',
    description: 'Profile statistic label',
  },
  MVP: {
    id: 'Profile.MVP',
    defaultMessage: 'MVP',
    description: 'Profile statistic label',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
