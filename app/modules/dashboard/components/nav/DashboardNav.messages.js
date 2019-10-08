import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  missions: {
    id: 'Dashboard.missions',
    defaultMessage: 'missions',
    description: 'Dashboard missions',
  },
  guides: {
    id: 'Dashboard.guides',
    defaultMessage: 'guides',
    description: 'Dashboard guides',
  },
  quests: {
    id: 'Dashboard.quests',
    defaultMessage: 'quests',
    description: 'Dashboard quests',
  },
  shows: {
    id: 'Dashboard.shows',
    defaultMessage: 'shows',
    description: 'Dashboard shows',
  },
  stories: {
    id: 'Dashboard.stories',
    defaultMessage: 'stories',
    description: 'Dashboard stories',
  },
  clubs: {
    id: 'Dashboard.clubs',
    defaultMessage: 'clubs',
    description: 'Dashboard clubs',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
