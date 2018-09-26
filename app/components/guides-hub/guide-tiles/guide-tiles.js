import React from 'react';
import PropTypes from 'prop-types';
import GuideTile from 'components/common/tiles/guide-tile';
import style from './guide-tiles.style';

const GuideTiles = ({ guides }) => (
  <ul className="guide-tiles-root">
    {guides.map(guide => (
      <li
        key={`guide-tile-${guide.subTitle}`}
        className="tile"
      >
        <GuideTile {...guide} />
      </li>
    ))}
    <style jsx>{style}</style>
  </ul>
);

GuideTiles.propTypes = {
  guides: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
  })).isRequired,
};

export default GuideTiles;
