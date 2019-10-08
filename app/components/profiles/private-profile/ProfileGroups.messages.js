import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  MyClubs: {
    id: 'Profile.MyClubs',
    defaultMessage: 'My Clubs',
    description: 'Profile groups title',
  },
  noGroups: {
    id: 'Hubs.noGroups',
    defaultMessage: 'There are no groups.',
    description: 'Hubs no groups messages',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
