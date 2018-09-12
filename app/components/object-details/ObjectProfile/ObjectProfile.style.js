import css from 'styled-jsx/css';
import { romance, lightHeadedAstronaut, geyser, hawkesBlue } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';
import { resetMarginPadding } from 'styles/variables/utils';

export default css`
  div {
    ${resetMarginPadding}
    color: ${lightHeadedAstronaut};
  }

  .object-details-grid {
    ${resetMarginPadding}
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
    background-color: ${romance};
    font-family: ${secondaryFont};
    font-size: 18px;
  }

  h2 {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    font-family: ${primaryFont};
    margin: 0;
    margin-bottom: 25px;
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 20px;
    letter-spacing: 1px;
    font-family: ${secondaryFont};
  }

  .column {
    padding: 40px;
  }

  .row,
  .row-3-1 {
    border-bottom: solid 1px ${geyser};
    display: flex;
  }

  .row-3-1 .column:first-child {
    flex: 75%;
    border-right: 1px solid ${geyser};
  }
`;
