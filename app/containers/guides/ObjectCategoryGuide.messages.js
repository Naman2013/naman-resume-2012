import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  SterlingTitle: {
    id: 'Guides.SterlingTitle',
    defaultMessage: 'Objects within this guide',
    description: 'Guides sterling title',
  },
  SterlingSubtitle: {
    id: 'Guides.SterlingSubtitle',
    defaultMessage: 'Select an Object for more information',
    description: 'Guides sterling subtitle',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
