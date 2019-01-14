import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge, screenMedium } from 'styles/variables/breakpoints';
import { resetMarginPadding } from 'styles/variables/utils';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .subscription-plans-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    ${resetMarginPadding}
    list-style-type: none;
  }

  .subscription-plans-list-item {
    width: 300px;
    height: auto;
    position: relative;
    ${resetMarginPadding}
    margin-top: 10px;
  }

  .subscription-plans-list-item :global(div) {
    margin: 0;
  }

  @media ${screenMedium} {
    .subscription-plans-list {
      margin-top: 20px;
    }

    .subscription-plans-list:after {
      content: '';
      flex: auto;
    }

    .subscription-plans-list-item {
      margin: 20px 10px 0;
    }
  }

  @media ${screenLarge} {
    .subscription-plans-list {
      margin: 40px 0;
    }
  }
`;
