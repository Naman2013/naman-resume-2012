import css from 'styled-jsx/css';
import { secondaryFont } from 'styles/variables/fonts';
import { resetMarginPadding } from 'styles/variables/utils';
import { faintShadow } from 'styles/variables/shadows';
import { romance } from 'styles/variables/colors_tiles_v4';
import { lightHeadedAstronaut, thatGrayWeForgot } from 'styles/variables/colors_tiles_v4';

export default css`
  .root {
    display: flex;
    flex-direction: column;
    background-color: ${romance};
    margin: 20px 0 0;
    padding: 25px;
    ${faintShadow}
  }
`;
