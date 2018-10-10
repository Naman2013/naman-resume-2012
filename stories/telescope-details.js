import React from 'react';
import { storiesOf } from '@storybook/react';
import { ModuleContainer, WhereInTheSky } from 'components/telescope-details/v4-modules';

storiesOf('TelescopeDetailsModules', module)
  .add('ModuleContainer: base for other modules', () => (
    <ModuleContainer title="Test title" />
  ))
  .add('WhereInTheSky', () => (
    <WhereInTheSky />
  ));
