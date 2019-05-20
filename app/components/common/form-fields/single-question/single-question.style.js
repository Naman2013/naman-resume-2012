import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import {
  astronaut,
  romance,
  seashell,
  golden_yellow,
  shadows,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium } from 'app/styles/variables/breakpoints';
import {
  backgroundImageCover,
  dropShadowContainer,
} from 'app/styles/mixins/utilities';

export default css`
  .root {
    height: 100px;
  }

  .question {
    font-size: 11px;
    color: ${astronaut};
    font-weight: bold;
    font-family: ${primaryFont};
    text-transform: uppercase;
    margin-bottom: 15px;
  }

  .answer {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 14px;
    font-family: Arial, sans-serif;
    font-weight: normal;
    line-height: 1.5;
    color: ${astronaut};
    background-color: ${seashell};
    background-clip: padding-box;
    border: 1px solid ${shadows};
    border-radius: 0.25rem;
  }
`;
