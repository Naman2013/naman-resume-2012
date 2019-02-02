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
  Breakdown: {
    id: 'Profile.Breakdown',
    defaultMessage: 'Breakdown',
    description: 'Profile statistic label',
  },
  Details: {
    id: 'Profile.Details',
    defaultMessage: 'Details',
    description: 'Profile statistic label',
  },
  MyBudges: {
    id: 'Profile.MyBudges',
    defaultMessage: 'My Budges',
    description: 'Profile statistic label',
  },
  Specialties: {
    id: 'Profile.Specialties',
    defaultMessage: 'Specialties',
    description: 'Profile statistic label',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
