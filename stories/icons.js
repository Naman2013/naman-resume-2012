import React from 'react';
import { storiesOf } from '@storybook/react';
import Close from '../app/components/common/icons/Close';
import Dots from '../app/components/common/icons/Dots';

storiesOf('Icons', module)
  .add('Close', () => (<Close />))
  .add('Dots', () => (<Dots theme={{ circleColor: 'aqua' }} />));
