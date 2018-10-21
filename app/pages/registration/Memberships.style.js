import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge, screenMedium } from 'styles/variables/breakpoints';
import { resetMarginPadding } from 'styles/variables/utils';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .subscription-plans-list {
    ${resetMarginPadding}
    list-style-type: none;
    margin-top: 50px;
  }

  .subscription-plans-list-item {
    width: 300px;
    height: 500px;
    position: relative;
    ${resetMarginPadding}
    margin: 25px 0;
    padding: 0 10px;
  }

  @media ${screenMedium} {
    .subscription-plans-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 65px;
    }
  }

  @media ${screenLarge} {
    .subscription-plans-list {
      margin: 40px 0;
    }
  }
`;
