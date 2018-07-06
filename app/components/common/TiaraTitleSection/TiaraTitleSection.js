import React from 'react';
import PropTypes from 'prop-types';
import CenterColumn from '../CenterColumn';
import Medallion from './Medallion';
import HorizontalRule from './HorizontalRule';
import { white_tile_paper, golden, golda } from '../../../styles/variables/colors_tiles_v4';
import style from './TiaraTitleSection.style';

const TiaraTitleSection = ({ preTitle, title, iconURL }) => (
  <div className="root">
    <div className="center-line" />
    <CenterColumn theme={{
        background: `url(${white_tile_paper})`,
        position: 'relative',
        zIndex: '10',
      }}
    >
      <Medallion
        iconURL={iconURL}
        dimension={65}
        theme={{
          position: 'absolute',
          left: '50%',
          top: '-20px',
          zIndex: '20',
          transform: 'translateX(-50%)',
        }}
      />

      <HorizontalRule theme={{ borderTop: `2px solid ${golden}`, top: '10px' }} />
      <HorizontalRule theme={{ borderTop: `1px solid ${golda}`, top: '15px' }} />

      <h2 className="title">
        <span className="pre-title">{preTitle}</span>
        {title}
      </h2>
    </CenterColumn>

    <style jsx>{style}</style>
  </div>
);

TiaraTitleSection.defaultProps = {
  preTitle: '',
  iconURL: '',
};

TiaraTitleSection.propTypes = {
  preTitle: PropTypes.string,
  iconURL: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default TiaraTitleSection;
