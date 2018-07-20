import React from 'react';
import { storiesOf } from '@storybook/react';
import BackArrow from '../app/atoms/icons/BackArrow';
import Close from '../app/atoms/icons/Close';
import Dots from '../app/atoms/icons/Dots';

storiesOf('Icons', module)
  .add('BackArrow', () => (<BackArrow theme={{ arrowColor: 'aqua' }} />))
  .add('Close', () => (<Close theme={{ fillColor: 'aqua' }} />))
  .add('Dots', () => (<Dots theme={{ circleColor: 'aqua' }} />));
