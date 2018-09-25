import React from 'react';
import { storiesOf } from '@storybook/react';
import BackArrow from '../app/atoms/icons/BackArrow';
import CheckAstronaut from '../app/atoms/icons/CheckAstronaut';
import Close from '../app/atoms/icons/Close';
import Dots from '../app/atoms/icons/Dots';
import MiraDot from '../app/atoms/icons/MiraDot';
import Triangle from '../app/atoms/icons/Triangle';

storiesOf('Icons', module)
  .add('BackArrow', () => (<BackArrow theme={{ arrowColor: 'aqua' }} />))
  .add('CheckAstronaut', () => (<CheckAstronaut />))
  .add('Close', () => (<Close theme={{ fillColor: 'aqua' }} />))
  .add('Dots', () => (<Dots theme={{ circleColor: 'aqua' }} />))
  .add('MiraDot', () => (<MiraDot />))
  .add('Triangle', () => (<Triangle theme={{ color: 'aqua' }} />));
