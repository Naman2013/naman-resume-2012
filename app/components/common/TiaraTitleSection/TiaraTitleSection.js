import React from 'react';
import PropTypes from 'prop-types';
import Medallion from './Medallion';
import { primaryFont } from '../../../styles/variables/fonts';
import { astronaut } from '../../../styles/variables/colors_tiles_v4';

const TiaraTitleSection = ({ preTitle, title, iconURL }) => (
  <div className="root">
    <Medallion iconURL={iconURL} />
    <h2 className="title">
      <span className="pre-title">{preTitle}</span>
      {title}
    </h2>

    <style jsx>
      {`
        .root {
          text-align: center;
          font-family: ${primaryFont};
          color: ${astronaut};
        }

        .title {
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
