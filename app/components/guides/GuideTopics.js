import React from 'react';
import PropTypes from 'prop-types';
import CenterColumn from 'app/components/common/CenterColumn';
import LailaTile from 'app/components/common/tiles/LailaTile';
import style from './GuideTopics.style';

const GuideTopics = ({ list }) => (
  <CenterColumn widths={['620px', '940px', '940px']}>
    <ul>
      {
        list.map(topic => (
          <li
            key={`${topic.iconURL}-${topic.title}`}
            className="topic"
          >
            <LailaTile
              iconURL={topic.iconURL}
              title={topic.title}
              linkURL={topic.linkURL}
            />
          </li>))
      }
    </ul>
    <style jsx>{style}</style>
  </CenterColumn>
);

GuideTopics.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    iconURL: PropTypes.string,
    linkURL: PropTypes.string,
  })).isRequired,
};

export default GuideTopics;
