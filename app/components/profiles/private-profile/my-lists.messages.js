import { defineMessages } from 'react-intl';
import { Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Objects: {
    id: 'Profile.Objects',
    defaultMessage: 'Objects',
    description: 'Objects  label'
  },
  Stories: {
    id: 'Profile.Stories',
    defaultMessage: 'Stories',
    description: 'Stories label'
  },
  Shows: {
    id: 'Profile.Shows',
    defaultMessage: 'Shows',
    description: 'Shows label'
  },
  Guides: {
    id: 'Profile.Guides',
    defaultMessage: 'Guides',
    description: 'Guides label'
  },
  Loading: {
    id: 'Profile.Loading',
    defaultMessage: 'Loading...',
    description: 'Profile loading label'
  },
  NoTiles: {
    id: 'Profile.NoTiles',
    defaultMessage: 'You have no items',
    description: 'No tiles label'
  }
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
