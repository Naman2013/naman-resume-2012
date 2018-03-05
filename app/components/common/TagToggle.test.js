import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TagToggle from './TagToggle';

it('it should render a menu', () => {
  const handleToggleClickSpy = sinon.spy();
  const testData = {
    handleTagClick: handleToggleClickSpy,
    activeTags: []
  };
  const tree = renderer.create(
    <TagToggle
      {...testData}
    />,
  );

  expect(tree.toJSON()).toMatchSnapshot();
});

it('it should render a defined menu', () => {
  const handleToggleClickSpy = sinon.spy();
  const testData = {
    handleTagClick: handleToggleClickSpy,
    activeTags: []
  };
  const component = shallow(<TagToggle {...testData} />);
  expect(component).toBeDefined();
});

it('it should render a no tags message if there are no tags', () => {
  const handleToggleClickSpy = sinon.spy();
  const testData = {
    handleTagClick: handleToggleClickSpy,
    tagList: [],
    activeTags: [],
  };
  const component = shallow(<TagToggle {...testData} />);
  expect(component.text()).toContain('There are no tags');
});

it('it should render tags message if tags are there', () => {
  const handleToggleClickSpy = sinon.spy();
  const testData = {
    handleTagClick: handleToggleClickSpy,
    tagList: ['yoo', 'alright'],
    activeTags: [],
  };
  const component = shallow(<TagToggle {...testData} />);
  expect(component.text()).not.toContain('There are no tags');
  expect(component.find('button').length).toBe(2);
});

it('it should call handleTagClick when a tag is clicked', () => {
  const handleToggleClickSpy = sinon.spy();
  const testData = {
    handleTagClick: handleToggleClickSpy,
    tagList: ['yoo', 'alright'],
    param: 'testParam',
    activeTags: []
  };
  const component = shallow(<TagToggle {...testData} />);
  const button = component.find('button').first();
  button.props().onClick();
  expect(handleToggleClickSpy.getCall(0).args[0]).not.toBe(testData.params, [testData.tagList[0]]);
});

it('it should have an active class if it is selected', () => {
  const testData = {
    handleTagClick: () => {},
    tagList: ['yoo', 'alright'],
    activeTags: ['yoo'],
  };
  const component = shallow(<TagToggle {...testData} />);
  const button = component.find('button').first();
  expect(button.props().className).toContain('active');
});
