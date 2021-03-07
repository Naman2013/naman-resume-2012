import css from 'styled-jsx/css';
import { secondaryFont } from 'app/styles/variables/fonts';
import { resetMarginPadding } from 'app/styles/variables/utils';
import { faintShadow } from 'app/styles/variables/shadows';
import { romance } from 'app/styles/variables/colors_tiles_v4';
import {
  lightHeadedAstronaut,
  thatGrayWeForgot,
} from 'app/styles/variables/colors_tiles_v4';

export default css`
  .root {
    display: flex;
    flex-direction: column;
    background-color: ${romance};
    margin: 20px 0 0;
    // padding: 25px;
    // ${faintShadow}
  }
`;
