import css from 'styled-jsx/css';
import { secondaryFont } from '../../../../styles/variables/fonts';
import {
  romance,
  lightHeadedAstronaut,
} from '../../../../styles/variables/colors_tiles_v4';

export default css`
  .guide-promo-tile-root {
    position: relative;
    background-color: ${romance};
    width: 100%;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
  }

  .guide-info {
    padding: 10px 40px 40px;
  }

  .guide-info h4 {
    font-family: ${secondaryFont};
    font-size: 24px;
    font-weight: 400;
    line-height: 50px;
    color: ${lightHeadedAstronaut};
    text-transform: none;
  }

  .guide-info .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
`;
