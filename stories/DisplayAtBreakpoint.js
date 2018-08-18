import React from 'react';
import { storiesOf } from '@storybook/react';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import { primaryFont } from 'styles/variables/fonts';

const TestComponent = () => (
  <div style={{ background: 'blue', textAlign: 'center', padding: '20px' }}>
    <h1 style={{ color: 'white', fontFamily: primaryFont, fontSize: '16px' }}>Testing at breakpoint</h1>
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
      <TestComponent />
    </DisplayAtBreakpoint>
  ))
  .add('Display small only', () => (
    <DisplayAtBreakpoint
      screenSmall
    >
      <TestComponent />
    </DisplayAtBreakpoint>
  ))
  .add('Display medium only', () => (
    <DisplayAtBreakpoint
      screenMedium
    >
      <TestComponent />
    </DisplayAtBreakpoint>
  ))
  .add('Display large only', () => (
    <DisplayAtBreakpoint
      screenLarge
    >
      <TestComponent />
    </DisplayAtBreakpoint>
  ))
  .add('Display XLarge only', () => (
    <DisplayAtBreakpoint
      screenXLarge
    >
      <TestComponent />
    </DisplayAtBreakpoint>
  ));
