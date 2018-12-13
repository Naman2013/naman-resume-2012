import React from 'react';
import PropTypes from 'prop-types';
import CenterColumn from 'components/common/CenterColumn';
import BobbieTile from 'components/common/tiles/BobbieTile';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import style from './TopicList.style';

const TopicList = ({ list }) => (
  <CenterColumn>
    <ul>
      {list.map(tile => <li key={`guide-panel-${tile.guidePanelId}`}>
        <DisplayAtBreakpoint screenSmall>
          <BobbieTile title={tile.title} readDuration={tile.readDuration} authorName={tile.authorName} HTMLBlob={tile.content_device_small} />
        </DisplayAtBreakpoint>

        <DisplayAtBreakpoint screenMedium>
          <BobbieTile title={tile.title} readDuration={tile.readDuration} authorName={tile.authorName} HTMLBlob={tile.content_device_medium} />
        </DisplayAtBreakpoint>

        <DisplayAtBreakpoint screenLarge screenXLarge>
          <BobbieTile title={tile.title} readDuration={tile.readDuration} authorName={tile.authorName} HTMLBlob={tile.content_device_large} />
        </DisplayAtBreakpoint>
      </li>)}
    </ul>
    <style jsx>{style}</style>
  </CenterColumn>
);

TopicList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    // authorName: PropTypes.string,
    // readDuration: PropTypes.string,
  })).isRequired,
};

export default TopicList;
