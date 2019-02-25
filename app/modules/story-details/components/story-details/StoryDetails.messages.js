import { defineMessages } from 'react-intl';
import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

// todo REMOVE ME
const messages: Messages = {
  related: {
    id: 'Stories.related',
    defaultMessage: 'Related',
    description: 'Stories Related',
  },
  story: {
    id: 'Stories.story',
    defaultMessage: 'Story',
    description: 'Story title',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
