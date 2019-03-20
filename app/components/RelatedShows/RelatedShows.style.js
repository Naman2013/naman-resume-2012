import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .related-shows-title {
    margin-bottom: 10px;
    font-family: ${primaryFont};
    font-weight: bold;
    color: ${astronaut};
    font-size: 12px;
    text-transform: uppercase;
  }

  .related-shows-count {
    font-weight: normal;
  }

  .flipped {
    display: none;
  }

  article {
    margin: 30px 0;
  }

  article:hover .card{
    display: none;
  }

  article:hover .flipped{
    display: block;
  }
`;
