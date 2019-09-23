import css from 'styled-jsx/css';
import { lynch } from 'app/styles/variables/colors_tiles_v4';
import { secondaryFont } from 'app/styles/variables/fonts';
import { screenLarge } from 'app/styles/variables/breakpoints';

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
    display: block;
    background: none;
    border: none;
    margin: 0 0 32px;
    padding: 0;
    font-weight: 700;
    font-style: italic;
  }

  .action-read-more:focus,
  .action-read-more:active {
    outline: none;
  }

  .show-about-curriculum {
    font-family: ${secondaryFont};
    font-style: italic;
    font-size: 18px;
  }
  @media ${screenLarge} {
    .__html-content__ {
      display: inline-block;
      max-width: 600px;
    }
  }
`;
