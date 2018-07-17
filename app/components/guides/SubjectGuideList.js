import React from 'react';
import PropTypes from 'prop-types';
import LeighTile from 'components/common/tiles/LeighTile';

const SubjectGuideList = ({ list }) => (
  <ul>
    {list.map(guide => <LeighTile key={`leight-tile-${guide.title}`} {...guide} />)}
  </ul>
);

SubjectGuideList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    anchorText: PropTypes.string.isRequired,
    createLink: PropTypes.func.isRequired,
  })).isRequired,
};

export default SubjectGuideList;
