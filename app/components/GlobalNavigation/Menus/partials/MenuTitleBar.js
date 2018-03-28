import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { white, black } from '../../../../styles/variables/colors';
import { primaryFont } from '../../../../styles/variables/fonts';
import COMMON_STYLE from '../../common-style';

const propTypes = {
  title: PropTypes.string.isRequired,
  handleCloseClick: PropTypes.func,
};

const defaultProps = {
  handleCloseClick: null,
};

const MenuTitleBar = ({ title, handleCloseClick }) => (
  <div className="root">
    <h4 className="title">{title}</h4>
    {
      handleCloseClick &&
        <button className="action" onClick={handleCloseClick}>
          <span className="fa fa-times"></span>
        </button>
    }
    <style jsx>{`
      .root {
        display: flex;
        justify-content: space-between;
        padding-left: ${COMMON_STYLE.menuLeftPadding}px;
        color: ${white};
        text-transform: uppercase;
        font-family: ${primaryFont};
        border-bottom: 1px solid ${black};
      }

      h4 { font-size: 12px; padding: 10px 0; }

      .action {
        width: 70px;
        font-size: 22px;
        background: ${black};
        border: none;
        color: ${white};
        cursor: pointer;
      }

      .action:focus {
        outline: none;
      }
    `}</style>
  </div>
);

MenuTitleBar.propTypes = propTypes;
MenuTitleBar.defaultProps = defaultProps;

export default MenuTitleBar;
