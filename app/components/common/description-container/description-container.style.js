import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge, screenXLarge } from 'styles/variables/breakpoints';
import { astronaut, lynch } from 'styles/variables/colors_tiles_v4';

const prefix = '.description-container';

export default css`
  .root {
    color: ${astronaut};
    font-family: ${secondaryFont};
    padding: 50px 35px;
    padding-bottom: 35px;
  }

  .title {
    margin: 0;
    padding: 26px 0;
    font-size: 24px;
    text-transform: unset;
    font-weight: normal;
  }

  ${prefix} :global(p) {
    color: ${lynch};
    margin: 0;
    margin-bottom: 15px;
    font-size: 18px;
    line-height: 1.5;
    white-space: pre-line;
  }

  ${prefix} :global(.iframe-container) {
    height: 0;
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    overflow: hidden; 
   }

   ${prefix} :global(.iframe-container iframe) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
   }

  ${prefix} :global(iframe) {
    width: 100%;
    height: 240px;
  }

  ${prefix} :global(a) {
    color: #337ab7;
    font-weight: bold;
    text-decoration: none;
  }

  @media ${screenMedium} {
    ${prefix} :global(iframe) {
     height: 340px;
   }
`;
