import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import MVPAstronomers from '../app/components/common/MVPAstronomers/MVPAstronomers';

storiesOf('MVPAstronomers', module)
  .add('Default', () => (
    <Fragment>
      <MVPAstronomers objId='7' />
    </Fragment>
  ));
