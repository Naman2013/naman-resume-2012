import React from 'react';
import ActivityForm from 'components/community-groups/overview/activity-form';
import { CALLSOURCE_GROUPS } from './discussionsBoardConfiguration';

const CREATE_THREAD_FORM = {
  [CALLSOURCE_GROUPS]: {
    render: props => (<ActivityForm {...props} />),
  }
};

export default CREATE_THREAD_FORM;
