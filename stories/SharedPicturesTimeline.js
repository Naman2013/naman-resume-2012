import React from 'react';
import { storiesOf } from '@storybook/react';
import SharedPicturesTimeline from '../app/components/home/shared-pictures-timeline';

const generateTimelineProps = (numberOfItems) => {
  const items = new Array(numberOfItems).fill().map((item, i) => ({
    label: `hello ${i+1}`,
    imageIndex: i,
  }));

  return {
    timelineList: items,
    timelineCount: items.length,
    changeMainSlider: () => {}
  };
};

storiesOf('Shared Pictures Timeline', module)
  .add('6 Items', () => (
    <SharedPicturesTimeline
      {...generateTimelineProps(6)}
    />
  ))
  .add('12 Items', () => (
    <SharedPicturesTimeline
      {...generateTimelineProps(12)}
    />
  ))
  .add('24 Items', () => (
    <SharedPicturesTimeline
      {...generateTimelineProps(24)}
    />
  ));
