import css from 'styled-jsx/css';
import { lightHeadedAstronaut } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';
import { faintShadow } from 'styles/variables/shadows';

export default css`
  .module-header {
    display: flex;
    align-items: center;
    padding-right: 40px;
    border-bottom: 5px solid ${lightHeadedAstronaut};
  }

  .title {
    margin: 0;
    padding: 40px;
    font-size: 12px;
    font-family: ${primaryFont};
    color: ${lightHeadedAstronaut};
    text-transform: uppercase;
  }
`;
