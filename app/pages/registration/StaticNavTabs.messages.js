import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  Step1: {
    id: 'Dashboard.Step1',
    defaultMessage: 'Step 1',
    description: 'Step 1',
  },
  Step2: {
    id: 'Dashboard.Step2',
    defaultMessage: 'Step 2',
    description: 'Step 2',
  },
  Step3: {
    id: 'Dashboard.Step3',
    defaultMessage: 'Step 3',
    description: 'Step 3',
  },
  Step4: {
    id: 'Dashboard.Step4',
    defaultMessage: 'Step 4',
    description: 'Step 4',
  },
  PlanDetails: {
    id: 'Dashboard.PlanDetails',
    defaultMessage: 'Plan Details',
    description: 'Plan Details',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
