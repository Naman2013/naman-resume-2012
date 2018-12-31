import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  bodyContentErrorMessage: {
    id: 'Stories.bodyContentErrorMessage',
    defaultMessage: 'Body Content is required.',
    description: 'Stories create form error message',
  },
  headlineErrorMessage: {
    id: 'Stories.headlineErrorMessage',
    defaultMessage: 'Headline is required.',
    description: 'Stories create form error message',
  },
  contentCategoryErrorMessage: {
    id: 'Stories.contentCategoryErrorMessage',
    defaultMessage: 'Content Category is required.',
    description: 'Stories create form error message',
  },
  objectCategoryErrorMessage: {
    id: 'Stories.objectCategoryErrorMessage',
    defaultMessage: 'Object Category is required.',
    description: 'Stories create form error message',
  },
  errorMessagePopupTitle: {
    id: 'Stories.errorMessagePopupTitle',
    defaultMessage: 'Missing Fields',
    description: 'Stories create form error popup title',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
