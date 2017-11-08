import React from 'react';
import renderer from 'react-test-renderer';
import jest from 'jest';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import PulseListHeader from './pulse-list-header';

it('it should render a menu', () => {
  const testData = {
    title: '',
    subtitle: '',
    showCreateNewPostButton: false,
  };
  const tree = renderer.create(
    <PulseListHeader
      {...testData}
    />,
  );

  expect(tree.toJSON()).toMatchSnapshot();
});

it('it should render a defined header', () => {
  const testData = {
    title: '',
    subtitle: '',
    showCreateNewPostButton: false,
  };
  const component = shallow(<PulseListHeader {...testData} />);
  expect(component).toBeDefined();
});

it('it should render a title and subtitle if one is passed', () => {
  const testData = {
    title: 'Illuminations',
    subtitle: 'subtitle',
    showCreateNewPostButton: false,
  };
  const component = mount(<PulseListHeader {...testData} />);
  expect(component.find('.header-title').first().text()).toContain(testData.title);
  expect(component.find('.header-subtitle').first().text()).toContain(testData.subtitle);
});
