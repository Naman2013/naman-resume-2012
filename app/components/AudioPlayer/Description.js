import React from 'react';
import PropTypes from 'prop-types';
import { white } from '../../styles/variables/colors';
import { primaryFont } from '../../styles/variables/fonts';

const propTypes = {
  titleText: PropTypes.string,
  subTitleText: PropTypes.string,
  showSubTitle: PropTypes.bool,
  showTitle: PropTypes.bool,
  subTitleInlineStyle: PropTypes.shape({
    color: PropTypes.string,
  }),
  titleInlineStyle: PropTypes.shape({
    color: PropTypes.string,
  }),
};

const defaultProps = {
  titleText: '',
  subTitleText: '',
  showSubTitle: false,
  showTitle: false,
  subTitleInlineStyle: {
    color: white,
  },
  titleInlineStyle: {
    color: white,
  },
};

const Description = ({
  titleText,
  showTitle,
  titleInlineStyle,
  subTitleText,
  showSubTitle,
  subTitleInlineStyle,
}) => (
  <div>
    <p className="content">
      {showTitle && <span style={titleInlineStyle}>{titleText}</span>}
      <br />
      {showSubTitle && <span style={subTitleInlineStyle}>{subTitleText}</span>}
    </p>

    <style jsx>{`
      .content {
        padding: 0;
        margin: 0;
        font-family: ${primaryFont};
        font-size: 12px;
      }
    `}</style>
  </div>
);

Description.propTypes = propTypes;
Description.defaultProps = defaultProps;

export default Description;
