import css from 'styled-jsx/css';
import {
  lightHeadedAstronaut,
  romance,
  hawkesBlue,
  moodyBleu,
  darkGray,
  shadows,
} from '../../../styles/variables/colors_tiles_v4';
import { primaryFont, helvetica } from '../../../styles/variables/fonts';

export default css`
  .stats-popover {
    position: absolute;
    left: 0;
    bottom: -395px;
    width: 100%;
    height: 415px;
    border: 1px solid ${darkGray};
    border-top: 6px solid ${lightHeadedAstronaut};
    box-shadow: 0 0 6px 0 ${shadows};
    background-color: ${romance};
  }

  .stats-popover-header {
    padding: 30px;
  }

  .stats-popover-title {
    font-family: ${primaryFont};
    font-size: 11px;
    line-height: 11px;
    text-transform: uppercase;
    color: ${lightHeadedAstronaut};
  }

  .stats-popover-total {
    font-family: ${helvetica};
    font-size: 40px;
    line-height: 40px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${lightHeadedAstronaut};
    margin-top: 8px;
  }

  :global(.react-tabs__tab-list) {
    margin: 0;
    border-top: 1px solid ${hawkesBlue};
    border-bottom: none;
    box-shadow: 0 10px 25px 0px rgba(237, 240, 242, 1);
  }

  :global(.react-tabs__tab) {
    width: 50%;
    padding: 13px 0 12px;
    border: none;
    border-right: 1px solid ${hawkesBlue};
    border-radius: 0;
    font-family: ${helvetica};
    font-size: 10px;
    line-height: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${moodyBleu};
    text-align: center;
  }

  :global(.react-tabs__tab):focus {
    box-shadow: none;
    border-color: ${hawkesBlue};
  }

  :global(.react-tabs__tab.react-tabs__tab--selected) {
    color: ${lightHeadedAstronaut};
  }

  :global(.react-tabs__tab.react-tabs__tab--selected):after {
    position: absolute;
    bottom: -1px;
    display: block;
    width: 100%;
    height: 11px;
    margin: auto;
    content: '';
    background: url('https://vega.slooh.com/assets/v4/common/icon_navarrow_blue.svg')
      no-repeat center center;
  }

  :global(.react-tabs__tab-list li):last-of-type {
    border: none;
  }

  :global(.react-tabs__tab-panel) {
    max-height: 245px;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;
