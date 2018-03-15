import React from 'react';
import PropTypes from 'prop-types';
import { white, darkGray } from '../../styles/variables/colors';
import { primaryFont } from '../../styles/variables/fonts';

const propTypes = {
  remainingCredits: PropTypes.number,
};

const defaultProps = {
  remainingCredits: 0,
};

const CenterBar = ({ remainingCredits }) => (
  <div className="root">
    <p>Remaining credits: { remainingCredits }</p>

    <style jsx>{`
      .root {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 60px;
        padding-right: 20px;

        font-family: ${primaryFont};
        text-transform: uppercase;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1.3px;

        color: ${white};
        border-right: 1px solid ${darkGray};
      }
    `}</style>
  </div>
);

CenterBar.propTypes = propTypes;
CenterBar.defaultProps = defaultProps;

export default CenterBar;
