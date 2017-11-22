import React from 'react';
import PropTypes from 'prop-types';
import { primaryFont } from '../../styles/variables/fonts';
import { brightYellow } from '../../styles/variables/colors';

const propTypes = {
  text: PropTypes.string,
  inlineTitleStyle: PropTypes.shape({
    color: PropTypes.string,
  }),
};

const defaultProps = {
  text: '',
  inlineTitleStyle: { color: brightYellow },
};

const Header = ({ text, inlineTitleStyle }) => (
  <div>
    <h2 style={inlineTitleStyle} className="title">
      {text}
    </h2>

    <style jsx>{`
      .title {
        font-size: 22px;
        margin: 0;
        padding: 0;
        font-family: ${primaryFont};
        font-weight: 800;
        text-transform: uppercase;
      }
    `}</style>
  </div>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
