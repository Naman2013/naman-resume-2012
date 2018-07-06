import React from 'react';
import PropTypes from 'prop-types';
import CenterColumn from '../CenterColumn';
import Medallion from './Medallion';
import HorizontalRule from './HorizontalRule';
import { primaryFont } from '../../../styles/variables/fonts';
import {
  astronaut,
  blue_tile_feat,
  white_tile_paper,
  midnight_express,
  golda,
  golden,
} from '../../../styles/variables/colors_tiles_v4';

const TiaraTitleSection = ({ preTitle, title, iconURL }) => (
  <div className="root">
    <div className="center-line" />
    <CenterColumn theme={{
        background: `url(${white_tile_paper})`,
        position: 'relative',
        zIndex: '10',
      }}
    >
      <Medallion iconURL={iconURL} />

      <HorizontalRule theme={{ borderTop: `2px solid ${golden}`, top: '10px' }} />
      <HorizontalRule theme={{ borderTop: `1px solid ${golda}`, top: '15px' }} />

      <h2 className="title">
        <span className="pre-title">{preTitle}</span>
        {title}
      </h2>
    </CenterColumn>



    <style jsx>
      {`
        .root {
          position: relative;
          text-align: center;
          font-family: ${primaryFont};
          color: ${astronaut};
          background: url(${blue_tile_feat});
          padding-top: 70px;
        }

        .center-line {
          position: absolute;
          top: 0;
          z-index: 5;
          width: 100%;
          height: 100%;
          width: 50%;
          border-right: 2px solid ${astronaut};
        }

        .title {
          padding-top: 95px;
          padding-bottom: 60px;
          font-weight: 300;
          text-transform: capitalize;
        }

        .pre-title {
          display: block;
          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 2px;
          font-size: 10px;
          margin-bottom: 20px;
        }
      `}
    </style>
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
