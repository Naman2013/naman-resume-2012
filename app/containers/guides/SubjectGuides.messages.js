import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  SubjectsSterlingTitle: {
    id: 'Guides.SubjectsSterlingTitle',
    defaultMessage: 'Topics within this guide',
    description: 'Guides subjects sterling title',
  },
  SubjectsSterlingSubtitle: {
    id: 'Guides.SubjectsSterlingSubtitle',
    defaultMessage: 'Select a Topic for more information',
    description: 'Guides subjects sterling subtitle',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
