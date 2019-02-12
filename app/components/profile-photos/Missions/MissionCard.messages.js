import { defineMessages } from 'react-intl';
import { type Messages } from 'utils/i18n/MessageDescriptor';

const messages: Messages = {
  Images: {
    id: 'Photos.Images',
    defaultMessage: 'Images',
    description: 'Images label on MissionCard',
  },
  OpenMission: {
    id: 'Photos.OpenMission',
    defaultMessage: 'Open mission',
    description: 'Open mission button on MissionCard',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;