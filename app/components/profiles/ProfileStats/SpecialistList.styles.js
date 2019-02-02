import css from 'styled-jsx/css';
import {
  hawkesBlue,
  lightHeadedAstronaut,
  romance,
} from '../../../styles/variables/colors_tiles_v4';
import { primaryFont, helvetica } from '../../../styles/variables/fonts';

export default css`
  .specialist-list {
    min-width: 298px;
  }

  :global(.specialist-list-item) {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    min-height: 72px;
    padding: 16px 30px 17px;
    border-bottom: 1px solid ${hawkesBlue};
  }

  .specialist-list-item-title {
    max-width: 170px;
    font-family: ${helvetica};
    font-size: 18px;
    line-height: 28px;
    text-decoration: none;
    color: ${lightHeadedAstronaut};
  }

  :global(.specialist-list-item):hover,
  :global(.specialist-list-item):focus {
    color: ${lightHeadedAstronaut};
  }

  .specialist-list-item-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${lightHeadedAstronaut};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .specialist-list-item-icon img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;
