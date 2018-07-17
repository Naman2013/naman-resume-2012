import React from 'react';
import PropTypes from 'prop-types';
import LeighTile from 'components/common/tiles/LeighTile';
import style from './SubjectGuideList.style';

const SubjectGuideList = ({ list }) => (
  <ul>
    {list.map(guide => <li key={`leigh-tile-${guide.title}`}><LeighTile {...guide} /></li>)}
    <style jsx>{style}</style>
  </ul>
);

SubjectGuideList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    anchorText: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
};

export default SubjectGuideList;
