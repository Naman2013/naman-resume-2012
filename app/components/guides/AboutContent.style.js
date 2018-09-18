import css from 'styled-jsx/css';
import { lynch } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';

export default css`
  .__html-content__ :global(p) {
    color: ${lynch};
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    font-family: ${secondaryFont};
    font-size: 18px;
    line-height: 1.75;
  }

  .action-read-more {
    background: none;
    border: none;
    margin: 0 0 32px;
    padding: 0;
  }

  .action-read-more:focus,
  .action-read-more:active { outline: none; }

  @media ${screenLarge} {
    .__html-content__ {
      display: inline-block;
    }
  }
`;
