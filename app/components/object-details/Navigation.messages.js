import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Overview: {
    id: 'Objects.Overview',
    defaultMessage: 'Overview',
    description: 'Objects navigation Overview',
  },
  Missions: {
    id: 'Objects.Missions',
    defaultMessage: 'Missions',
    description: 'Objects navigation Missions',
  },
  Quests: {
    id: 'Objects.Quests',
    defaultMessage: 'Quests',
    description: 'Objects navigation Quests',
  },
  Ask: {
    id: 'Objects.Ask',
    defaultMessage: 'Ask',
    description: 'Objects navigation Ask',
  },
  Observations: {
    id: 'Objects.Observations',
    defaultMessage: 'Observations',
    description: 'Objects navigation Observations',
  },
  Shows: {
    id: 'Objects.Shows',
    defaultMessage: 'Shows',
    description: 'Objects navigation Shows',
  },
  Stories: {
    id: 'Objects.Stories',
    defaultMessage: 'Stories',
    description: 'Objects navigation Stories',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
