import { defineMessages } from 'react-intl';
import { type Messages } from 'utils/i18n/MessageDescriptor';

const messages: Messages = {
  Images: {
    id: 'Profile.Photos.MissionCard.Images',
    defaultMessage: 'Images',
    description: 'Images label on MissionCard',
  },
  OpenMission: {
    id: 'Profile.Photos.MissionCard.OpenMission',
    defaultMessage: 'Open mission',
    description: 'Open mission button on MissionCard',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;