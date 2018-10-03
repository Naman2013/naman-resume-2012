import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge, screenXLarge } from 'styles/variables/breakpoints';
import { astronaut, lynch } from 'styles/variables/colors_tiles_v4';

export default css`
  .root {
    color: ${astronaut};
    font-family: ${primaryFont};
    padding: 50px 35px;
    padding-bottom: 35px;
  }

  .big-title {
    font-family: ${secondaryFont};
    font-size: 24px;

  }

  .title {
    margin: 0;
    padding: 26px 0;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 2px;
  }

  p {
    color: ${lynch};
    margin: 0;
    padding: 0;
    margin-bottom: 32px;
    font-family: ${secondaryFont};
    font-size: 18px;
    line-height: 1.75;
  }
`;
