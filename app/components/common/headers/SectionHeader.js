import React from 'react';
import PropTypes from 'prop-types';
import { lightTurqoise, black } from '../../../styles/variables/colors';
import { sloohHeaders } from '../../../styles/variables/fonts';

const SectionHeader = ({ title }) => (
  <div className="root">
    <h3 className="title">{title}</h3>

    <style jsx>{
      `
        .root {
          font-family: ${sloohHeaders};
          background-color: ${black};
          text-align: center;
          padding: 10px 0;
        }

        .title {
          color: ${lightTurqoise};
          text-transform: none;
          font-size: 24px;
        }
      `
    }</style>
  </div>
);

SectionHeader.defaultProps = {
  title: '',
};

SectionHeader.propTypes = {
  title: PropTypes.string,
};

export default SectionHeader;
