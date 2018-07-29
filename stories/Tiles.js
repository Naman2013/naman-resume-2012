import React from 'react';
import { storiesOf } from '@storybook/react';
import BobbieTile from 'components/common/tiles/BobbieTile';
import LailaTile from 'components/common/tiles/LailaTile';
import LeighTile from 'components/common/tiles/LeighTile';
import { SAMPLE_IMAGE_HTML_BLOG, SAMPLE_VIDEO_HTML_BLOB } from './content/getGuidesPanels';

storiesOf('Tiles', module)
  .add('BobbieTile - 40_60_SPLIT with image', () => (
    <BobbieTile HTMLBlob={SAMPLE_IMAGE_HTML_BLOG} />
  ))
  .add('BobbieTile - 60_40_SPLIT with video', () => (
    <BobbieTile HTMLBlob={SAMPLE_VIDEO_HTML_BLOB} />
  ))
  .add('LailaTile', () => (
    <LailaTile
      title="Venus"
      iconURL="https://vega.slooh.com/icons/home/observatory.png"
    />
  ))
  .add('LeighTile', () => (
    <LeighTile
      title="Astronomical time"
      anchorText="Topic 1"
    />
  ));
