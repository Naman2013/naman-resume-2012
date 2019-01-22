import { defineMessages } from 'react-intl';
import { type Messages } from 'utils/i18n/MessageDescriptor';

const messages: Messages = {
  PhotoRoll: {
    id: 'Profile.Photos.PhotoRoll',
    defaultMessage: 'Photo roll',
    description: 'Privat profile PhotoHub PhotoRoll',
  },
  Observations: {
    id: 'Profile.Photos.Observations',
    defaultMessage: 'Observations',
    description: 'Privat profile PhotoHub Observations',
  },
  Missions: {
    id: 'Profile.Photos.Missions',
    defaultMessage: 'Missions',
    description: 'Privat profile PhotoHub Missions',
  },
  Galleries: {
    id: 'Profile.Photos.Galleries',
    defaultMessage: 'Galleries',
    description: 'Privat profile PhotoHub Galleries',
  },
  MyPhotoHub: {
    id: 'Profile.Photos.MyPhotoHub',
    defaultMessage: 'My Photo Hub',
    description: 'Privat profile PhotoHub title',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
