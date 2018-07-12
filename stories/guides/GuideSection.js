import React from 'react';
import { storiesOf } from '@storybook/react';
import GuideSection from '../../app/components/guides/GuideSection';
import GuideBodyContent from '../../app/components/guides/GuideBodyContent';
import GuideContentList from '../../app/components/guides/GuideContentList';
import DeviceProvider from '../../app/providers/DeviceProvider';

const bodyContent = `Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero lorem posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing evitae est. Sed nec felis loren posuere posuere, rutrum eu ipsum. Aliquam eget odio sed ligula dolae iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni consectetur eget placerat a, tempus a neque. Donec ut elit urna. Etiam venenatis leni eleifend urna eget scelerisqueliquam in nunc.

Donec sit amet ligula eget nisi sodales egestas. Aliquam interdum dolor aliquet dolor  iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni
posuere vulputate. Etiam elit elit, elementum sed varius at.`;

const props = {
  content: () => <GuideBodyContent title="About this guide" content={bodyContent} />,
  column: () => (<GuideContentList list={['contains 10 objects', 'object type guide', 'beginners and up']} />),
  alignContent: 'right',
};

storiesOf('GuideSection', module)
  .add('Left', () => (
    <DeviceProvider>
      <GuideSection {...props} />
    </DeviceProvider>
  ));
