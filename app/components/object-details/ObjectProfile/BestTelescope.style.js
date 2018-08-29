import css from 'styled-jsx/css';
import { secondaryFont } from 'styles/variables/fonts';
import { resetMarginPadding } from 'styles/variables/utils';
import { lightHeadedAstronaut, thatGrayWeForgot } from 'styles/variables/colors_tiles_v4';

export default css`
  ul {
    ${resetMarginPadding}
    display: flex;
    list-style-type: none;
  }

  button {
    ${resetMarginPadding}
    background: none;
    border: none;
    font-family: ${secondaryFont};
    font-size: 20px;
    color: ${thatGrayWeForgot};
    margin-right: 40px;
    cursor: pointer;
  }

  button.active {
    color: ${lightHeadedAstronaut};
  }

  button:active,
  button:focus {
    outline: none;
  }
`;
