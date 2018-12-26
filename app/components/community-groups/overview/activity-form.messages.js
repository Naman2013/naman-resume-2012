import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  WriteSomething: {
    id: 'Clubs.WriteSomething',
    defaultMessage: 'Write something',
    description: 'Clubs Write something',
  },
  SubmitPostError: {
    id: 'Clubs.SubmitPostError',
    defaultMessage: 'There was an error submitting your post.',
    description: 'Clubs Write something',
  },
  PostSubmitted: {
    id: 'Clubs.PostSubmitted',
    defaultMessage: 'Your post has been submitted',
    description: 'Clubs Write something',
  },
  NavTitle: {
    id: 'Clubs.NavTitle',
    defaultMessage: 'Activity',
    description: 'Clubs nav title',
  },
  NavSecondTitle: {
    id: 'Clubs.NavSecondTitle',
    defaultMessage: 'Members',
    description: 'Clubs nav second title',
  },
  FetchingListError: {
    id: 'Clubs.FetchingListError',
    defaultMessage: 'There was an error fetching list',
    description: 'Clubs fetching list error',
  },
  CommunityGroup: {
    id: 'Clubs.CommunityGroup',
    defaultMessage: 'Community Group',
    description: 'Clubs Community Group',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
