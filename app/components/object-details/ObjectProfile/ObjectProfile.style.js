import css from 'styled-jsx/css';
import {
  romance,
  lightHeadedAstronaut,
  geyser,
  hawkesBlue,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium } from 'app/styles/variables/breakpoints';
import { resetMarginPadding } from 'app/styles/variables/utils';

export default css`
  div {
    ${resetMarginPadding}
    color: ${lightHeadedAstronaut};
  }

  .row {
    display: flex;
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 20px;
    letter-spacing: 1px;
    font-family: ${secondaryFont};
  }
`;
