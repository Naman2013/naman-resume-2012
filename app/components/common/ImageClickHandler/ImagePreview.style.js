import css from 'styled-jsx/css';

export default css`
  .image {
    max-width: 100%;
    max-height: 90vh;
    height: auto;
    outline: 2px black solid;
    border: 2px white solid;
  }

  :global(.magnifier-wrapper .image > div > img) {
    max-width: 100%;
    max-height: 90vh;
    height: auto;
    outline: 2px black solid !important;
    border: 2px white solid !important;
    width: auto !important;
  }

  :global(.magnifier-wrapper .image > div > div > img) {
    visibility: hidden;
    min-width: 200%;
  }
`;
