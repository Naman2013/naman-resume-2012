import React from 'react';
import { storiesOf } from '@storybook/react';
import GuideSection from '../../app/components/guides/GuideSection';
import AbelList from '../../app/components/common/AbelList';
import DeviceProvider from '../../app/providers/DeviceProvider';

const props = {
  content: () => `Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero lorem posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing evitae est. Sed nec felis loren posuere posuere, rutrum eu ipsum. Aliquam eget odio sed ligula dolae iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni consectetur eget placerat a, tempus a neque. Donec ut elit urna. Etiam venenatis leni eleifend urna eget scelerisqueliquam in nunc.

Donec sit amet ligula eget nisi sodales egestas. Aliquam interdum dolor aliquet dolor  iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni
posuere vulputate. Etiam elit elit, elementum sed varius at.`,
  column: () => (<AbelList list={['contains 10 objects', 'object type guide', 'beginners and up']} />),
  alignContent: 'right',
};

storiesOf('GuideSection', module)
  .add('Left', () => (
    <DeviceProvider>
      <GuideSection {...props} />
    </DeviceProvider>
  ));
