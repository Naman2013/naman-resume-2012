import css from 'styled-jsx/css';
import { lightHeadedAstronaut } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';
import { faintShadow } from 'styles/variables/shadows';

export default css`
  .module-header {
    display: flex;
    align-items: center;
    border-bottom: 5px solid ${lightHeadedAstronaut};
  }
  
  .module-header.with-icon {
    justify-content: space-between;
    padding-right: 40px;
  }

  .title {
    margin: 0;
    padding: 40px;
    font-size: 12px;
    font-family: ${primaryFont};
    color: ${lightHeadedAstronaut};
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;
