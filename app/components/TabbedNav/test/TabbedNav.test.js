import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import noop from 'lodash/noop';
import JOIN_TABS from './testConfig';
import TabbedNav from '../TabbedNav';

let mockedEvents = new Array(JOIN_TABS.length).fill({});

mockedEvents = mockedEvents.map((evt, i) => ({
  currentTarget: {
    dataset: {
      tab: JOIN_TABS[i].value,
    },
  },
}));

it('it should render a tab menu', () => {
  const onTabClickSpy = sinon.spy();
  const testData = {
    onTabClick: onTabClickSpy,
    activeTabValue: '/join/step1',
    tabs: JOIN_TABS,
  };
  const tree = renderer.create(<TabbedNav {...testData} />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('it should call changeActiveTab with the correct value when a tab is clicked', () => {
  const onTabClickSpy = sinon.spy();
  const testData = {
    onTabClick: onTabClickSpy,
    activeTabValue: '/join/step1',
    tabs: JOIN_TABS,
  };
  const component = shallow(<TabbedNav {...testData} />);
  const button = component.find('button').first();
  button.simulate('click', mockedEvents[0]);
  expect(onTabClickSpy.getCall(0).args[0]).toBe(JOIN_TABS[0].value);
});

it('it should NOT display a triangle icon if it is NOT the active item', () => {
  const testData = {
    onTabClick: noop,
    activeTabValue: '/join/step2',
    tabs: JOIN_TABS,
  };
  const component = shallow(<TabbedNav {...testData} />);
  const button = component.find('button').first();
  const img = button.find('img').first();
  expect(img.props().className).toContain('is-hidden');
});
