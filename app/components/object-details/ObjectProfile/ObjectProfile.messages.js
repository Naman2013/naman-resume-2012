import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  ScientificName: {
    id: 'Objects.ScientificName',
    defaultMessage: 'Scientific Name',
    description: 'Objects Scientific Name',
  },
  CelestialCoordinates: {
    id: 'Objects.CelestialCoordinates',
    defaultMessage: 'Celestial Coordinates',
    description: 'Objects Celestial Coordinates',
  },
  Magnitude: {
    id: 'Objects.Magnitude',
    defaultMessage: 'Magnitude',
    description: 'Objects Magnitude',
  },
  ApparentAngularSize: {
    id: 'Objects.ApparentAngularSize',
    defaultMessage: 'Apparent Angular Size',
    description: 'Objects Apparent Angular Size',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
