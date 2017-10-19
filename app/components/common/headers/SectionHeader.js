import React from 'react';
import PropTypes from 'prop-types';
import { lightTurqoise, black } from '../../../styles/variables/colors';
import { sloohHeaders } from '../../../styles/variables/fonts';

const SectionHeader = ({ title, subtitle }) => (
  <div className="root">
    <h3 className="title">{title}</h3>
    {
      subtitle &&
        <h4 className="subtitle">{subtitle}</h4>
    }

    <style jsx>{`
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
    `}</style>
  </div>
);

SectionHeader.defaultProps = {
  title: '',
  subtitle: '',
};

SectionHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default SectionHeader;
