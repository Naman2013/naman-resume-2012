import css from 'styled-jsx/css';
import { primaryFont } from 'styles/variables/fonts';
import { lightHeadedAstronaut } from 'styles/variables/colors_tiles_v4';
import { resetMarginPadding } from 'styles/variables/utils';

export default css`
  .root {
    display: flex;
    align-items: flex-start;
    ${resetMarginPadding}
    color: ${lightHeadedAstronaut};
    padding: 30px;
    border-bottom: 1px solid;
  }

  .positioning-container {
    width: 100%;
  }

  .title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    font-family: ${primaryFont};
    margin: 0;
    margin-bottom: 25px;
    white-space: nowrap;
  }
`;
