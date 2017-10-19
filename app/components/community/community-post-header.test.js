import React from 'react';
import renderer from 'react-test-renderer';
import jest from 'jest';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import CommunityPostHeader from './community-post-header';

it('it should render a header', () => {
  const testData = {
    errorOccurred: false,
    objectIconURL: '',
    showCreateNewPostButton: false,
    subtitleText: '',
    titleText: '',
  };
  const tree = renderer.create(
    <CommunityPostHeader
      {...testData}
    />,
  );

  expect(tree.toJSON()).toMatchSnapshot();
});

it('it should render a defined header', () => {
  const testData = {
    errorOccurred: false,
    objectIconURL: '',
    showCreateNewPostButton: false,
    subtitleText: '',
    titleText: '',
  };
  const component = shallow(<CommunityPostHeader {...testData} />);
  expect(component).toBeDefined();
});

it('it should render a title and subtitle if one is passed', () => {
  const testData = {
    titleText: 'title',
    subtitleText: 'subtitle',
    objectIconURL: '',
    showCreateNewPostButton: false,
    errorOccurred: false,
  };
  const component = mount(<CommunityPostHeader {...testData} />);
  expect(component.find('.title-text').first().text()).toContain(testData.titleText);
  expect(component.find('.subtitle').first().text()).toContain(testData.subtitleText);
});
