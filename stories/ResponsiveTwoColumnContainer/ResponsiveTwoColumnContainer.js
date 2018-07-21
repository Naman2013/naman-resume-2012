import React from 'react';
import { storiesOf } from '@storybook/react';
import ResponsiveTwoColumnContainer from '../../app/components/ResponsiveTwoColumnContainer';

storiesOf('ResponsiveTwoColumnContainer', module)
  .add('Renders two columns on desktop and one column on tablet and mobile', () => (
    <ResponsiveTwoColumnContainer
      asideContainerTitle="Details"
      asideContainerContent={{
        render: () => <div>This should be on the right</div>
      }}
      isDesktop={true}
      mainContainerTitle="Observations"
      mainContainerContent={{
        render: () => <div>Adjust window width</div>
      }}

    />
  ));
