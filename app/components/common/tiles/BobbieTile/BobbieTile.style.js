import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, geyser } from 'styles/variables/colors_tiles_v4';
import { resetMarginPadding } from 'styles/variables/utils';

export default css`
  div, h3, ul, li {
    ${resetMarginPadding}
  }

  .root {
    ${faintShadow}
    background: white;
  }

  .tile-content-container {
    padding: 40px;
  }

  .title {
    font-family: ${secondaryFont};
    font-size: 20px;
    color: ${astronaut};
    border-bottom: 1px solid ${geyser};
    font-weight: 300;
    padding-bottom: 20px;
  }

  ul {
    list-style-type: none;
    font-family: ${primaryFont};
    color: ${astronaut};
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
    padding-top: 20px;
  }

  .author-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .html-blob-content-container,
  .read-duration {
    display: none;
  }
`;
