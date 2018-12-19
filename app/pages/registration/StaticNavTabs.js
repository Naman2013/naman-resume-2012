import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './StaticNavTabs.messages';

export const DEFAULT_JOIN_TABS = [
  {
    label: <FormattedMessage {...messages.Step1} />,
    value: '/join/step1',
  },
  {
    label: <FormattedMessage {...messages.Step2} />,
    value: '/join/step2',
  },
  {
    label: <FormattedMessage {...messages.Step3} />,
    value: '/join/step3',
  },
];

export const JOIN_BY_INVITE_TABS = [
  {
    label: <FormattedMessage {...messages.Step1} />,
    value: '/join/inviteByCodeStep1',
  },
  {
    label: <FormattedMessage {...messages.Step2} />,
    value: '/join/inviteByCodeStep2',
  },
];

export const CLASSROOM_JOIN_TABS = [
  {
    label: <FormattedMessage {...messages.Step1} />,
    value: '/join/step1',
  },
  {
    label: <FormattedMessage {...messages.Step2} />,
    value: 'join/step1SchoolSelection',
  },
  {
    label: <FormattedMessage {...messages.Step3} />,
    value: '/join/step2',
  },
  {
    label: <FormattedMessage {...messages.Step4} />,
    value: '/join/step3',
  },
];

export const PLAN_DETAILS_JOIN_TABS = [
  {
    label: <FormattedMessage {...messages.PlanDetails} />,
    value: '/join/membershipPlanDetailsStep',
  },
  {
    label: <FormattedMessage {...messages.Step2} />,
    value: '/join/step2',
  },
  {
    label: <FormattedMessage {...messages.Step3} />,
    value: '/join/step3',
  },
];
