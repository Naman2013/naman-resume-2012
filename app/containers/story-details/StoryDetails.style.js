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
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`

  .root {
    background-color: ${seashell};
  }
  .shadowed {
    ${faintShadow}
  }

  .header-container {
    background-color: ${romance};
    padding: 100px 100px 0 100px;
    overflow: auto;
  }

  .story-title {
    font-size: 40px;
    font-family: ${secondaryFont};
    padding-bottom: 25px;
  }

  .story-main-image-container {
    position: relative;
    background-color: ${romance};
    margin: 25px auto;
    border-radius: 100%;
    border: 1px solid ${shadows};
    height: 500px;
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .vert-line-container {
    position: relative;
    padding-top: 15px;
    padding-bottom: 25px;
  }

  .vert-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    border-right: 1px solid ${shadows};
  }

  .story-main-image {
    border-radius: 100%;
    height: 440px;
    width: 440px;
  }

  .flex {
    display: flex;
    flex-direction: row;
  }

  .actions {
    align-items: center;
    justify-content: space-between;
  }

  .author {
    flex: 3;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 10px;
    letter-spacing: 1px;
  }

  .by-line {
    color: ${astronaut};
    border-top: 1px solid ${shadows};
    border-bottom: 1px solid ${shadows};
    align-items: center;
    padding-bottom: 0;
  }
`;
