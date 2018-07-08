import React from 'react';
import { shallow } from 'enzyme';
import AbelList from '../../common/AbelList';
import GuideSection from './GuideSection';

describe('GuideSection', () => {
  const props = {
    content: `Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero lorem posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing evitae est. Sed nec felis loren posuere posuere, rutrum eu ipsum. Aliquam eget odio sed ligula dolae iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni consectetur eget placerat a, tempus a neque. Donec ut elit urna. Etiam venenatis leni eleifend urna eget scelerisqueliquam in nunc.

Donec sit amet ligula eget nisi sodales egestas. Aliquam interdum dolor aliquet dolor  iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni
posuere vulputate. Etiam elit elit, elementum sed varius at.`,
    column: () => (<AbelList list={['contains 10 objects', 'object type guide', 'beginners and up']} />),
    contentAlign: 'left',
  };

  const shallowWrapper = shallow(<GuideSection {...props} />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
