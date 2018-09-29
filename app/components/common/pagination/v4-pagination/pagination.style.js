import css from 'styled-jsx/css';
import { resetMarginPadding } from 'styles/variables/utils';
import { lightHeadedAstronaut, faintBlue } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';

export default css`
  .page-select-root {
    ${resetMarginPadding}
    list-style-type: none;
    font-family: ${primaryFont};
    font-weight: 800;
  }

  .page-select {
    display: inline-block;
    padding: 0 10px;
  }

  .page-select :global(a) {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${lightHeadedAstronaut};
    border: 1px solid ${faintBlue};
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
`;
