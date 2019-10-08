import { type Messages } from '../../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  UploadImageErrorText: {
    id: 'Alerts.UploadImageError',
    defaultMessage: 'There was an error uploading your image.',
    description: 'Upload image error message',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
