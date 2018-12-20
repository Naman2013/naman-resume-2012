import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  FeaturedTitle: {
    id: 'Guides.FeaturedTitle',
    defaultMessage: 'Featured observation',
    description: 'Guides Featured title',
  },
  FeaturedSubtitle: {
    id: 'Guides.FeaturedSubtitle',
    defaultMessage: 'Community observation',
    description: 'Guides Featured subtitle',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
