import css from 'styled-jsx/css';

export default css`
  .image {
    max-width: 100%;
    max-height: 90vh;
    height: auto;
    outline: 2px black solid;
    border: 2px white solid;
  }

  :global(.magnifier-wrapper div[style="position: relative;"] > img) {
    max-width: 100%;
    max-height: 90vh;
    height: auto;
    outline: 2px black solid !important;
    border: 2px white solid !important;
    width: auto !important;
  }

  :global(.magnifier-wrapper div[style="user-select: none; cursor: move;"] > div > img) {
    visibility: hidden;
  }

  :global(.magnifier-wrapper div[style="position: relative;"] > div > img) {
    min-width: 200%;
  }
`;
