import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  About: {
    id: 'Shows.About',
    defaultMessage: 'About',
    description: 'Shows About',
  },
  Comments: {
    id: 'Shows.Comments',
    defaultMessage: 'Comments',
    description: 'Shows Comments',
  },
  Details: {
    id: 'Shows.Details',
    defaultMessage: 'Details',
    description: 'Shows Details',
  },
  RelatedShows: {
    id: 'Shows.RelatedShows',
    defaultMessage: 'Related Shows',
    description: 'Shows Related Shows',
  },
  RelatedStories: {
    id: 'Shows.RelatedStories',
    defaultMessage: 'Related Stories',
    description: 'Shows Related Stories',
  },
  RelatedGuides: {
    id: 'Shows.RelatedGuides',
    defaultMessage: 'Related Guides',
    description: 'Shows Related Guides',
  },
  AiringNow: {
    id: 'Shows.AiringNow',
    defaultMessage: 'Airing Now',
    description: 'Shows Airing Now',
  },
  LiveShow: {
    id: 'Shows.LiveShow',
    defaultMessage: 'Live Show',
    description: 'Shows Live Show',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
