import React from 'react';
import PropTypes from 'prop-types';
import { lightTurqoise, black } from '../../../styles/variables/colors';

const SectionHeader = ({ title }) => (
  <div className="root">
    <h3 className="title">{title}</h3>

    <style jsx>{
      `
        .root {
          background-color: ${black};
          text-align: center;
        }

        .title {
          color: ${lightTurqoise}
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
