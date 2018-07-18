import React from 'react';
import { storiesOf } from '@storybook/react';
import SterlingTitle from '../../app/components/common/titles/SterlingTitle';

const TITLE = 'Objects within this guide';
const SUB_TITLE = 'Select an Object for more information';

storiesOf('Titles', module)
  .add('SterlingTitle with sub-title', () => (
    <SterlingTitle title={TITLE} subTitle={SUB_TITLE} />
  ))
  .add('SterlingTitle without sub-title', () => (
    <SterlingTitle title={TITLE} />
  ))
  .add('SterlingTitle customized', () => (
    <SterlingTitle title={TITLE} subTitle={SUB_TITLE} theme={{ title: { color: 'aqua' }, subTitle: { color: 'red' } }} />
  ));
