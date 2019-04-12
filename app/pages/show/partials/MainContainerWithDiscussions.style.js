import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    margin-top: 25px;
  }

  .shadowed {
    ${faintShadow}
  }

  .comment-container {
    margin: 25px 0;
  }

  .desktop-view { display: none; }
  .mobile-view { display: block; }


  @media ${screenLarge} {
    .desktop-view { display: block; }
    .mobile-view { display: none; }
  }
`;
