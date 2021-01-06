import css from 'styled-jsx/css';
import { lightHeadedAstronaut } from 'app/styles/variables/colors_tiles_v4';

export default css`
  .nav-actions {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 25px auto;
  }
  .sroll-action{
    height:75px;
  }

  .nav-actions :global(.slooh-select__single-value) {
    color: ${lightHeadedAstronaut};
  }

  .observations-pagination {
    margin-bottom: 40px;
  }
`;
