import css from 'styled-jsx/css';
import { primaryFont } from 'app/styles/variables/fonts';
import { lightHeadedAstronaut } from 'app/styles/variables/colors_tiles_v4';
import { faintShadow } from 'app/styles/variables/shadows';
import { resetMarginPadding } from 'app/styles/variables/utils';
import { screenLarge } from 'app/styles/variables/breakpoints';

export default css`

  .obs-visibility-root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .select-field {
    ${faintShadow}
    ${resetMarginPadding}
    display: inline-block;
    position: relative;
    margin-right: 10px;
  }

  .day-sell {
    ${faintShadow}
    ${resetMarginPadding}
    display: inline-block;
    margin-right: 10px;
    padding: 5px 7.5px;
  }
  .day-sell:focus {
    outline:0;
  }
  .day-sell:active {
    outline:none;
  }

  .day-month {
    text-align: center;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    outline: none;
  }

  .rise-set-subtitle {
    margin-top: 15px;
  }

  .is-active {
    border-bottom: 3px solid ${lightHeadedAstronaut};
  }

  .option-label {
    ${resetMarginPadding}
    border-bottom: 3px solid ${lightHeadedAstronaut};
    text-transform: uppercase;
    font-family: ${primaryFont};
    font-weight: 600;
    font-size: 12px;
    padding: 10px 15px;
  }

  .field-value-name {
    display: inline-block;
    margin-right: 40px;
  }

  .select {
    position: absolute;
    left: 0;
    width: 100%;
    opacity: 0;
  }

  .select option {
    font-family: ${primaryFont};
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
  }

  @media ${screenLarge} {
    .obs-visibility-root {
      // flex-direction: row;
    }
  }
`;
