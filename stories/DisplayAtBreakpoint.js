import React from 'react';
import { storiesOf } from '@storybook/react';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import { primaryFont } from 'styles/variables/fonts';

const TestComponent = ({ text }) => (
  <div style={{ background: 'blue', textAlign: 'center', padding: '20px' }}>
    <h1 style={{ color: 'white', fontFamily: primaryFont, fontSize: '16px' }}>{text}</h1>
  </div>
);

storiesOf(' DisplayAtBreakpoint', module)
  .add('Display at all breakpoints', () => (
    <DisplayAtBreakpoint
      screenSmall
      screenMedium
      screenLarge
      screenXLarge
    >
      <TestComponent text="Display at all breakpoints" />
    </DisplayAtBreakpoint>
  ))
  .add('Display small only', () => (
    <DisplayAtBreakpoint
      screenSmall
    >
      <TestComponent text="Screen is small" />
    </DisplayAtBreakpoint>
  ))
  .add('Display medium only', () => (
    <DisplayAtBreakpoint
      screenMedium
    >
      <TestComponent text="Screen is medium" />
    </DisplayAtBreakpoint>
  ))
  .add('Display large only', () => (
    <DisplayAtBreakpoint
      screenLarge
    >
      <TestComponent text="Screen is large" />
    </DisplayAtBreakpoint>
  ))
  .add('Display XLarge only', () => (
    <DisplayAtBreakpoint
      screenXLarge
    >
      <TestComponent text="Screen is XLarge" />
    </DisplayAtBreakpoint>
  ))
  .add('Display at small or large only', () => (
    <DisplayAtBreakpoint
      screenSmall
      screenLarge
    >
      <TestComponent text="Screen is either small or large" />
    </DisplayAtBreakpoint>
  ))
  .add('Display at medium or XLarge only', () => (
    <DisplayAtBreakpoint
      screenMedium
      screenXLarge
    >
      <TestComponent text="Screen is either medium or Xlarge" />
    </DisplayAtBreakpoint>
  ))
  .add('Display at small, medium or XLarge only', () => (
    <DisplayAtBreakpoint
      screenSmall
      screenMedium
      screenXLarge
    >
      <TestComponent text="Screen is small, medium or XLarge" />
    </DisplayAtBreakpoint>
  ));
