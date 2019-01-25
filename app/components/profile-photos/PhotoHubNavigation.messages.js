import { defineMessages } from 'react-intl';
import { type Messages } from 'utils/i18n/MessageDescriptor';

const messages: Messages = {
  PhotoRoll: {
    id: 'Photos.PhotoRoll',
    defaultMessage: 'Photo roll',
    description: 'Private profile PhotoHub PhotoRoll',
  },
  Observations: {
    id: 'Photos.Observations',
    defaultMessage: 'Observations',
    description: 'Private profile PhotoHub Observations',
  },
  Missions: {
    id: 'Photos.Missions',
    defaultMessage: 'Missions',
    description: 'Private profile PhotoHub Missions',
  },
  Galleries: {
    id: 'Photos.Galleries',
    defaultMessage: 'Galleries',
    description: 'Private profile PhotoHub Galleries',
  },
  MyPhotoHub: {
    id: 'Photos.MyPhotoHub',
    defaultMessage: 'My Photo Hub',
    description: 'Private profile PhotoHub title',
  },
  AllObservations: {
    id: 'Photos.Filters.AllObservations',
    defaultMessage: 'All observations',
    description: 'Label for images filter',
  },
  MostRecent: {
    id: 'Photos.Filters.MostRecent',
    defaultMessage: 'Most recent',
    description: 'Label for images filter',
  },
  MostPopular: {
    id: 'Photos.Filters.MostPopular',
    defaultMessage: 'Most popular',
    description: 'Label for images filter',
  },
  SavedForLater: {
    id: 'Photos.Filters.SavedForLater',
    defaultMessage: 'Saved for later',
    description: 'Label for images filter',
  },
  Options: {
    id: 'Photos.Options',
    defaultMessage: 'Options',
    description: 'Select default label',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
