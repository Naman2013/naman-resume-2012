import css from 'styled-jsx/css';
import { primaryFont } from 'styles/variables/fonts';
import { lightHeadedAstronaut } from 'styles/variables/colors_tiles_v4';
import { faintShadow } from 'styles/variables/shadows';
import { resetMarginPadding } from 'styles/variables/utils';

export default css`
  .select-field {
    ${faintShadow}
    ${resetMarginPadding}
    display: inline-block;
    position: relative;
    margin-right: 10px;
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
`;
