import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import {
  astronaut,
  romance,
  golden_yellow,
  shadows,
  seashell,
} from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {

  }

  .dots-container {
    position: absolute;
    right: 0;
    height: 40px;
    width: 40px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 1px dashed ${astronaut};
  }

  .context-container {
    width: 75%;
    position: absolute;
    left: 0;
    margin: 0 50px;
  }

  .sort-dropdown-container {
    width: 100%;
    background-color: ${seashell};
  }

`;
