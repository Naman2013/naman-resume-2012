import React from 'react';
import PropTypes from 'prop-types';
import CenterColumn from 'components/common/CenterColumn';
import LailaTile from 'components/common/tiles/LailaTile';
import style from './GuideTopics.style';

const GuideTopics = ({ list }) => (
  <CenterColumn>
    <ul>
      {
        list.map(topic => <LailaTile key={`${topic.iconURL}-${topic.title}`} iconURL={topic.iconURL} title={topic.title} />)
      }
    </ul>
    <style jsx>{style}</style>
  </CenterColumn>
);

GuideTopics.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    iconURL: PropTypes.string,
  })).isRequired,
};

export default GuideTopics;
