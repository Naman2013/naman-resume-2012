import css from 'styled-jsx/css';
import { lightHeadedAstronaut } from '../../../styles/variables/colors_tiles_v4';
import { primaryFont } from '../../../styles/variables/fonts';

export default css`
  .gravity-stats {
    min-width: 298px;
  }

  .gravity-stats-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: ${lightHeadedAstronaut};
    font-family: ${primaryFont};
    font-size: 14px;
    font-weight: 500;
    padding: 15px 15px 15px 25px;
  }

  .gravity-stats-list * {
    margin-top: 10px;
  }
`;
