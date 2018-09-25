import React from 'react';
import PropTypes from 'prop-types';
import GuideTile from 'components/common/tiles/guide-tile';

const GuideTiles = ({ guides }) => (
  <ul>
    {guides.map(guide => (
      <li
        key={`guide-tile-${guide.subTitle}`}
      >
        <GuideTile {...guide} />
      </li>
    ))}
  </ul>
);

GuideTiles.propTypes = {
  guides: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
  })).isRequired,
};

export default GuideTiles;
