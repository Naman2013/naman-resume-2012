import React from 'react';
import renderer from 'react-test-renderer';
import SectionHeader from './SectionHeader';

const testData = {
  providedTitle: 'test title',
};

it('renders some text when provided', () => {
  const sectionHeaderComponent = renderer.create(
    <SectionHeader title={testData.providedTitle} />,
  );

  const renderedHeader = sectionHeaderComponent.toJSON();
  expect(renderedHeader).toMatchSnapshot();
});
