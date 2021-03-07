import css from 'styled-jsx/css';
import { secondaryFont } from 'app/styles/variables/fonts';
import { resetMarginPadding } from 'app/styles/variables/utils';
import {
  lightHeadedAstronaut,
  thatGrayWeForgot,
} from 'app/styles/variables/colors_tiles_v4';

export default css`
  .navigation {
    ${resetMarginPadding}
    display: flex;
    list-style-type: none;
    margin-bottom: 20px;
  }

  .action-tab {
    ${resetMarginPadding}
    background: none;
    border: none;
    font-family: ${secondaryFont};
    font-size: 18px;
    color: ${thatGrayWeForgot};
    margin-right: 40px;
    padding-bottom: 5px;
    cursor: pointer;
  }

  .action-tab.active {
    color: ${lightHeadedAstronaut};
    border-bottom: 2px solid ${lightHeadedAstronaut};
  }

  .action-tab:active,
  .action-tab:focus {
    outline: none;
  }
  
  .chart-div{
    width: 100%;
    height: 450px;
    border: none;
  }
`;
