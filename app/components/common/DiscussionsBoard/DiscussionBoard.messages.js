import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Cancel: {
    id: 'AskAnAstronomer.Cancel',
    defaultMessage: 'Cancel',
    description: 'AskAnAstronomer Cancel button',
  },
  SaveChanges: {
    id: 'AskAnAstronomer.SaveChanges',
    defaultMessage: 'Save Changes',
    description: 'AskAnAstronomer Save Changes button',
  },
  EditDescription: {
    id: 'AskAnAstronomer.EditDescription',
    defaultMessage: 'Edit Description',
    description: 'AskAnAstronomer Edit Description button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
