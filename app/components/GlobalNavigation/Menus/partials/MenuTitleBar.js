import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { romance, astronaut, shadows } from '../../../../styles/variables/colors_tiles_v4';
import { faintShadow } from 'styles/variables/shadows';
import { primaryFont } from '../../../../styles/variables/fonts';
import COMMON_STYLE from '../../common-style';

const propTypes = {
  title: PropTypes.string.isRequired,
  iconURL: PropTypes.string,
};

const defaultProps = {
  iconURL: '',
};

const MenuTitleBar = ({ title, iconURL, children }) => (
  <div className="root">
    <div className="tippy-top">
      {title ? <h4 className="title">{title}</h4> : null}
      {iconURL ? <img src={iconURL} className="icon" /> : null}
    </div>
    {children ? <div className="large">{children}</div> : null}
    <style jsx>{`
      .root {
        width: 400px;
        min-height: 90px;
        display: flex;
        flex-direction: column;
        padding-left: ${COMMON_STYLE.menuLeftPadding}px;
        background-color: ${romance};
        color: ${astronaut};
        text-transform: uppercase;
        justify-content: center;
        font-weight: bold;
        font-family: ${primaryFont};
        font-size: 12px;
        align-items: center;
        border-bottom: 1px solid ${shadows};
        ${faintShadow}
      }

      .tippy-top {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      .icon {
        height: 25px;
        width: 25px;
        margin-right: 25px;
      }

      h4 { font-size: 12px; padding: 10px 0; }

      .action {
        width: 70px;
        font-size: 22px;
        background: ${astronaut};
        border: none;
        color: ${romance};
        cursor: pointer;
      }

      .action:focus {
        outline: none;
      }

      .large {
        width: 100%;
      }
    `}</style>
  </div>
);

MenuTitleBar.propTypes = propTypes;
MenuTitleBar.defaultProps = defaultProps;

export default MenuTitleBar;
