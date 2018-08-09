import React from 'react';
import { storiesOf } from '@storybook/react';
import SubPageNavigation from '../app/components/common/sub-page-navigation';

const generateNavItems = (objectId) => ([
  {
    title: 'Neque',
    link:`/object-details/${objectId}/Neque`
  },
  {
    title: 'porro',
    link:`/object-details/${objectId}/porro`
  },
  {
    title: 'quisquam',
    link:`/object-details/${objectId}/quisquam`
  },
  {
    title: 'est',
    link:`/object-details/${objectId}/est`
  },
  {
    title: 'qui',
    link:`/object-details/${objectId}/qui`
  },
  {
    title: 'dolorem',
    link:`/object-details/${objectId}/dolorem`
  },
  {
    title: 'ipsum',
    link:`/object-details/${objectId}/ipsum`
  },
]);

storiesOf('SubPageNavigation', module)
  .add('Default', () => (
    <SubPageNavigation items={generateNavItems(1)} />
  ));
