import css from 'styled-jsx/css';
import { resetMarginPadding } from 'styles/variables/utils';
import { primaryFont } from 'styles/variables/fonts';
import { astronaut } from 'styles/variables/colors_tiles_v4';

export default css`
  .title {
    ${resetMarginPadding}
    font-family: ${primaryFont};
    color: ${astronaut};
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-size: 12px;
  }
`;
