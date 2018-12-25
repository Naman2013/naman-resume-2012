import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  RiseSetTimes: {
    id: 'Objects.RiseSetTimes',
    defaultMessage: 'Rise & set times',
    description: 'Objects Rise & set times ',
  },
  Loading: {
    id: 'Objects.Loading',
    defaultMessage: 'Loading',
    description: 'Objects Loading',
  },
  Rise: {
    id: 'Objects.Rise',
    defaultMessage: 'Rise',
    description: 'Objects Rise',
  },
  Transit: {
    id: 'Objects.Transit',
    defaultMessage: 'Transit',
    description: 'Objects Transit',
  },
  Set: {
    id: 'Objects.Set',
    defaultMessage: 'Set',
    description: 'Objects Set',
  },
  Notes: {
    id: 'Objects.Notes',
    defaultMessage: 'Notes',
    description: 'Objects Notes',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
