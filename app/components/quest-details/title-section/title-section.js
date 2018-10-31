import React from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import CenterColumn from 'components/common/CenterColumn';
import Medallion from 'components/common/TiaraTitleSection/Medallion';
import { white_tile_paper, golden, golda } from 'styles/variables/colors_tiles_v4';
import style from './title-section.style';

const QuestDetailsTitleSection = ({ preTitle, title, iconURL }) => (
  <div className="root">
    <CenterColumn theme={{
        background: `url(${white_tile_paper})`,
        position: 'relative',
        zIndex: '10',
        boxShadow: 'rgb(191, 191, 191) 0px 11px 20px -10px',
      }}
    >
    <div className="shield-container">
      <div className="blue-shield" />
      <div className="icon-container">
        <img className="icon-content" alt="" width="40" height="40" src={iconURL} />
      </div>
    </div>

      <h2 className="title">
        <span className="pre-title">{preTitle}</span>
        {title}
      </h2>
    </CenterColumn>

    <style jsx>{style}</style>
  </div>
);

QuestDetailsTitleSection.defaultProps = {
  preTitle: '',
  iconURL: '',
};

QuestDetailsTitleSection.propTypes = {
  preTitle: PropTypes.string,
  iconURL: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default QuestDetailsTitleSection;
