import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import { astronaut, geyser } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium } from 'app/styles/variables/breakpoints';
import {
  backgroundImageCover,
  dropShadowContainer,
} from 'app/styles/mixins/utilities';

export default css`
  .root {
    font-family: ${primaryFont};
    position: relative;
  }
  .live-video-container {
    display: block;
    width: 100%;
    margin-top: 10px;
    position: relative;
    justify-content: center;
    align-items: center;
    ${faintShadow}
  }
`;
