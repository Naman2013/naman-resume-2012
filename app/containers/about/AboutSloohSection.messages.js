import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  LearnTo: {
    id: 'About.LearnTo',
    defaultMessage: 'Learn to',
    description: 'About hero text',
  },
  Explore: {
    id: 'About.Explore',
    defaultMessage: 'Explore',
    description: 'About hero text',
  },
  Space: {
    id: 'About.Space',
    defaultMessage: 'Space',
    description: 'About hero text',
  },
  TogetherWithSlooh: {
    id: 'About.TogetherWithSlooh',
    defaultMessage: 'Together with slooh',
    description: 'About hero text',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
