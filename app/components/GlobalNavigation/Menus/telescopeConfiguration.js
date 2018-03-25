import React from 'react';
import uniqueId from 'lodash/uniqueId';
import PrimaryButton from './partials/buttons/PrimaryButton';

export default {
  component: <PrimaryButton />,
  content: [
    {
      _ID: uniqueId(),
      text: 'Chile one',
      anchor: '/telescope-details/3f332115-7908-11e6-a635-0eb2b1774883/4624887a-7909-11e6-a635-0eb2b1774883',
    },
    {
      _ID: uniqueId(),
      text: 'Canary one',
      anchor: '/telescope-details/d7f673a5-7908-11e6-a635-0eb2b1774883/1ff72faa-7909-11e6-a635-0eb2b1774883',
    },
    {
      _ID: uniqueId(),
      text: 'Canary two',
      anchor: '/telescope-details/d7f673a5-7908-11e6-a635-0eb2b1774883/2590c3fd-7909-11e6-a635-0eb2b1774883',
    },
    {
      _ID: uniqueId(),
      text: 'Canary three',
      anchor: '/telescope-details/d7f673a5-7908-11e6-a635-0eb2b1774883/3686b322-7909-11e6-a635-0eb2b1774883',
    },
  ],
};
