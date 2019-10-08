import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  title: {
    id: 'Telescopes.title',
    defaultMessage: 'Telescopes',
    description: 'Telescopes title',
  },
  setUp: {
    id: 'Telescopes.setUp',
    defaultMessage: 'MISSION SET-UP',
    description: 'Telescopes set-up button',
  },
  myPhotos: {
    id: 'Telescopes.myPhotos',
    defaultMessage: 'MY PHOTO HUB',
    description: 'Telescopes my photos button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
