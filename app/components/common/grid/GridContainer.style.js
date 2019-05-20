import css from 'styled-jsx/css';
import { resetMarginPadding } from 'app/styles/variables/utils';
import { romance } from 'app/styles/variables/colors_tiles_v4';
import { secondaryFont } from 'app/styles/variables/fonts';

export default css`
  .object-details-grid-container {
    ${resetMarginPadding}
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
    background-color: ${romance};
    font-family: ${secondaryFont};
    font-size: 18px;
  }
`;
