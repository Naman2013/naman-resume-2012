import React from 'react';
import { storiesOf } from '@storybook/react';
import { ModuleContainer } from 'components/telescope-details/v4-modules';

storiesOf('TelescopeDetailsModules', module)
  .add('ModuleContainer: base for other modules', () => (
    <ModuleContainer />
  ));
