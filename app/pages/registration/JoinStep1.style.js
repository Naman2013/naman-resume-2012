import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge, screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .step-root {
    margin: 0 auto;
    width: 100%;
  }
  .section-heading {
    font-size: 14px;
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    padding: 25px 0;
    letter-spacing: 2px;
  }

  .subscription-plans-list {
    padding: 0;
    list-style-type: none;
  }

  .subscription-plans-list-item {

  }

  @media ${screenMedium} {
      .step-root {
        width: 600px;
      }
    }
`;
