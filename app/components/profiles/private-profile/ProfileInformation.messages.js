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
  MyBadges: {
    id: 'Profile.MyBadges',
    defaultMessage: 'My Badges',
    description: 'Profile statistic label',
  },
  Specialties: {
    id: 'Profile.Specialties',
    defaultMessage: 'Specialties',
    description: 'Profile statistic label',
  },
  Guide: {
    id: 'Profile.Guide',
    defaultMessage: 'Guide',
    description: 'Profile statistic label',
  },
  Stats: {
    id: 'Profile.Stats',
    defaultMessage: 'Stats',
    description: 'Profile statistic label',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
