import css from 'styled-jsx/css';
import { lightHeadedAstronaut } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';
import { faintShadow } from 'app/styles/variables/shadows';

export default css`
  .module-header {
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
