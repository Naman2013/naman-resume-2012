import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Cancel: {
    id: 'Clubs.Cancel',
    defaultMessage: 'Cancel',
    description: 'Clubs Cancel button',
  },
  Close: {
    id: 'Clubs.Close',
    defaultMessage: 'Close',
    description: 'Clubs Close button',
  },
  RequestGroup: {
    id: 'Clubs.RequestGroup',
    defaultMessage: 'Request a group',
    description: 'Clubs Request Group button',
  },
  RequestAnotherGroup: {
    id: 'Clubs.RequestAnotherGroup',
    defaultMessage: 'Request Another Group',
    description: 'Clubs Request Another Group button',
  },
  GroupTitle: {
    id: 'Clubs.GroupTitle',
    defaultMessage: 'Name your Group',
    description: 'Clubs group title placeholder',
  },
  GroupDescription: {
    id: 'Clubs.GroupDescription',
    defaultMessage: "Tell us about the Group you'd like to request",
    description: 'Clubs group description placeholder',
  },
  PublicGroup: {
    id: 'Clubs.PublicGroup',
    defaultMessage: 'Public Group',
    description: 'Clubs Public Group button',
  },
  PrivateGroup: {
    id: 'Clubs.PrivateGroup',
    defaultMessage: 'Private Group',
    description: 'Clubs Private Group button',
  },
  Submit: {
    id: 'Clubs.Submit',
    defaultMessage: 'Submit',
    description: 'Clubs Submit button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
