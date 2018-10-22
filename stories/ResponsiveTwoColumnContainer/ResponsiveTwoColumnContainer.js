import React from 'react';
import { storiesOf } from '@storybook/react';
import ResponsiveTwoColumnContainer from '../../app/components/ResponsiveTwoColumnContainer';

storiesOf('ResponsiveTwoColumnContainer', module)
  .add('Renders two columns on desktop and one column on tablet and mobile', () => (
    <ResponsiveTwoColumnContainer
      asideContainerTitle="Details"
      renderAsideContent={() => <div style={{
        width: '100%',
        height: '500px',
        'background-color': 'red',
      }}>This should be on the right</div>}
      isScreenLarge={true}
      mainContainerTitle="Observations"
      renderMainContent={() => <div style={{
        width: '100%',
        height: '500px',
        'background-color': 'blue',
      }} >Adjust window width</div>}
      renderNavigationComponent={() => <div>Navigation</div>}
    />
  ));
