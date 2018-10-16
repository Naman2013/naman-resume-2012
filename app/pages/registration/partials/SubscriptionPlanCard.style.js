import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`

  .root {
    margin: 15px 0;
  }
  .inner-container {
    border: 1px solid ${shadows};
    padding: 50px;
    background-color: ${romance};
    ${faintShadow}
  }

  .title {
    padding-bottom: 15px;
  }

  .emphasize {
    font-size: 10px;
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .plan-name {
    font-family: ${secondaryFont};
    font-size: 24px;
  }

  .plan-cost {
    font-family: ${primaryFont};
    font-size: 45px;
    font-weight: light;
  }

  .border-bottom {
    border-bottom: 1px solid ${shadows};
  }

  .padded-top-bottom {
    padding: 15px 0;
  }

  .flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

`;
