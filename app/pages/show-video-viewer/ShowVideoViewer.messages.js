import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  VideoViewer: {
    id: 'Shows.VideoViewer',
    defaultMessage: 'Video Viewer',
    description: 'Shows Video Viewer',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
