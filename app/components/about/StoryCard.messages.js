import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Slooh: {
    id: 'About.Slooh',
    defaultMessage: 'Slooh',
    description: 'StoryCard text',
  },
  News: {
    id: 'About.News',
    defaultMessage: 'News',
    description: 'StoryCard text',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
