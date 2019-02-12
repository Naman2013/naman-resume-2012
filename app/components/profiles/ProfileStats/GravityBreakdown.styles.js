import css from 'styled-jsx/css';
import {
  hawkesBlue,
  lightHeadedAstronaut,
  romance,
} from '../../../styles/variables/colors_tiles_v4';
import { primaryFont, helvetica } from '../../../styles/variables/fonts';

export default css`
  .gravity-breakdown {
    min-width: 298px;
  }

  .gravity-breakdown-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    min-height: 72px;
    padding: 16px 30px 17px;
    border-bottom: 1px solid ${hawkesBlue};
  }

  .gravity-breakdown-item-label {
    max-width: 170px;
    font-family: ${helvetica};
    font-size: 18px;
    line-height: 28px;
    color: ${lightHeadedAstronaut};
  }

  .gravity-breakdown-item-count {
    width: 60px;
    height: 40px;
    border-radius: 20px;
    background-color: ${lightHeadedAstronaut};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${primaryFont};
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 1px;
    color: ${romance};
  }
`;
