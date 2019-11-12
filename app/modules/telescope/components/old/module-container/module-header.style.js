import css from 'styled-jsx/css';
import { lightHeadedAstronaut } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';
import { faintShadow } from 'app/styles/variables/shadows';

export default css`
  .module-header {
    display: flex;
    align-items: center;
    border-bottom: 5px solid ${lightHeadedAstronaut};
    min-height: 100px;
  }

  .module-header.with-icon {
    justify-content: space-between;
    padding-right: 40px;
  }

  .title {
    margin: 0;
    padding: 0 40px;
    font-size: 12px;
    font-family: ${primaryFont};
    color: ${lightHeadedAstronaut};
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;
