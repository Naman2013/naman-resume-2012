import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, geyser } from 'styles/variables/colors_tiles_v4';
import { resetMarginPadding } from 'styles/variables/utils';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

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

  .subtitle {
    list-style-type: none;
    font-family: ${primaryFont};
    color: ${astronaut};
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 20px 0;
    padding: 10px 0;
    border-bottom: 1px solid ${geyser};
    border-top: 1px solid ${geyser};
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

  .__html-blob-content-container__,
  .read-duration {
    /* display: none; */
  }

  .__html-blob-content-container__ :global(ol) {
    margin-left: 40px;
    margin-bottom: 20px;
  }

  .__html-blob-content-container__ :global(ul) {
    margin-left: 40px;
    margin-bottom: 20px;
  }

  .__html-blob-content-container__ :global(li) {
    margin-bottom: 10px;
  }

  .__html-blob-content-container__ :global(p) {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .__html-blob-content-container__ :global(h1) {
    margin-top: 40px;
    margin-bottom: 10px;
  }

  .__html-blob-content-container__ :global(h2) {
    margin-top: 40px;
    margin-bottom: 10px;
  }

  .__html-blob-content-container__ :global(h3) {
    margin-top: 40px;
    margin-bottom: 10px;
  }

  .__html-blob-content-container__ :global(h4) {
    margin-top: 40px;
    margin-bottom: 10px;
  }

  .__html-blob-content-container__ :global(h5) {
    margin-top: 40px;
    margin-bottom: 10px;
  }

  @media ${screenMedium} {
    .__html-blob-content-container__,
    .read-duration {
      display: block;
    }

    .author-name img,
    .author-name span { display: none; }

    .tile-content-container {
      padding: 40px 50px;
    }

    ul {
      display: flex;
      padding: 10px 0;
      margin-bottom: 20px;
      border-bottom: 1px solid ${geyser};
    }

    .read-duration {
      border-right: 1px solid ${geyser};
      padding-right: 10px;
      margin-right: 10px;
    }
  }

  @media ${screenLarge} {
    .tile-content-container {
      padding: 80px;
    }

    .title {
      font-size: 24px;
    }
  }
`;
