import { defineMessages } from 'react-intl';
import { type Messages } from '../../../../../utils/i18n/MessageDescriptor';


// todo REMOVE ME
const messages: Messages = {
  relatedStories: {
    id: 'Stories.relatedStories',
    defaultMessage: 'Related Stories',
    description: 'Stories Related Stories',
  },
  relatedShows: {
    id: 'Stories.relatedShows',
    defaultMessage: 'Related Shows',
    description: 'Stories Related Shows',
  },
  relatedGuides: {
    id: 'Stories.relatedGuides',
    defaultMessage: 'Related Guides',
    description: 'Stories Related Guides',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
