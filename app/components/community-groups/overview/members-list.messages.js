import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  GroupMembers: {
    id: 'Clubs.GroupMembers',
    defaultMessage: 'Group Members ({membersCount})',
    description: 'Clubs group members',
  },
  MoreMember: {
    id: 'Clubs.MoreMember',
    defaultMessage: 'MORE MEMBER',
    description: 'Clubs More Member button',
  },
  MoreMembers: {
    id: 'Clubs.MoreMembers',
    defaultMessage: 'MORE MEMBERS',
    description: 'Clubs More Members button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
