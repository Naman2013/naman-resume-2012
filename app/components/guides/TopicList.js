import React from 'react';
import PropTypes from 'prop-types';
import CenterColumn from 'components/common/CenterColumn';
import BobbieTile from 'components/common/tiles/BobbieTile';
import style from './TopicList.style';

const TopicList = ({ list }) => (
  <CenterColumn>
    <ul>
      {list.map(tile => <li key={`guide-panel-${tile.guidePanelId}`}><BobbieTile title={tile.title} readDuration={tile.readDuration} authorName={tile.authorName} HTMLBlob={tile.content} /></li>)}
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
