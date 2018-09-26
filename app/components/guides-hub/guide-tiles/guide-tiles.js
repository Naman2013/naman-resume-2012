import React from 'react';
import PropTypes from 'prop-types';
import CenterColumn from 'components/common/CenterColumn';
import GuideTile from 'components/common/tiles/guide-tile';
import style from './guide-tiles.style';

const GuideTiles = ({ guides }) => (
  <CenterColumn breakpoints={['630px', '945px', '945px']}>
    <ul className="guide-tiles-root">
      {guides.map(guide => (
        <li
          key={`guide-tile-${guide.subTitle}`}
          className="tile"
        >
          <GuideTile {...guide} />
        </li>
      ))}
    </ul>
    <style jsx>{style}</style>
  </CenterColumn>
);

GuideTiles.propTypes = {
  guides: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
  })).isRequired,
};

export default GuideTiles;
