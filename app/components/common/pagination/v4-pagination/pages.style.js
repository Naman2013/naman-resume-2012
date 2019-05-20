import css from 'styled-jsx/css';
import { resetMarginPadding } from 'app/styles/variables/utils';
import {
  lightHeadedAstronaut,
  faintBlue,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';

export default css`
  .page-select-root {
    ${resetMarginPadding}
    margin: 0 15px;
    list-style-type: none;
    font-family: ${primaryFont};
    font-weight: 800;
  }

  .page-select {
    display: inline-block;
    padding: 0 10px;
  }

  .action {
    outline: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-family: ${primaryFont};
    font-weight: 800;
    color: ${lightHeadedAstronaut};
    border: 1px solid ${faintBlue};
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  .action.active {
    background-color: ${lightHeadedAstronaut};
    border: none;
    color: white;
  }
`;
