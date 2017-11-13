import React from 'react';
import PropTypes from 'prop-types';
import { white } from '../../styles/variables/colors';
import { primaryFont } from '../../styles/variables/fonts';

const propTypes = {
  content: PropTypes.string,
};

const defaultProps = {
  content: '',
};

const Description = ({ content }) => (
  <div>
    <p className="content">{content}</p>

    <style jsx>{`
      .content {
        padding: 0;
        margin: 0;
        font-family: ${primaryFont};
        color: ${white};
      }
    `}</style>
  </div>
);

Description.propTypes = propTypes;
Description.defaultProps = defaultProps;

export default Description;
