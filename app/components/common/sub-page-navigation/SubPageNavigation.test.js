import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import SubPageNavigation from './';

const NAV_ITEMS = [
  {
    title: 'Overview',
    link:`/object-details/overview`
  },
  {
    title: 'Ask an Astronomer',
    link:`/object-details/ask`
  }
];

it('should render nothing when no links', () => {
  const tree = renderer.create(
    <SubPageNavigation />,
  );

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should render a list of links', () => {
  const tree = renderer.create(
    <SubPageNavigation items={NAV_ITEMS} />,
  );
  const component = mount(<SubPageNavigation items={NAV_ITEMS} />);
  expect(tree.toJSON()).toMatchSnapshot();
  expect(component.find('a').length).toBe(2);
  expect(component.find('a').first().text()).toBe(NAV_ITEMS[0].title);
});
